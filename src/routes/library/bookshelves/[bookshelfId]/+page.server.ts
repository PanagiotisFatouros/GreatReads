import type { ServerLoadEvent } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import { redirect } from '@sveltejs/kit';
import type { Bookshelf, Book } from '../../../../types/book.type';
import { prismaClient } from '$lib/lucia';
import { error } from '@sveltejs/kit';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../../../../scripts'
import { getSession } from 'lucia-sveltekit/load';

/** @type {import('./$types').PageServerLoad} */
export async function load(event: ServerLoadEvent) {
	const {request, url, params} = event

	const session = await getSession(event);
	
	try {
		const bookshelfId:number = params.bookshelfId == null ? -1 : parseInt(params.bookshelfId);
		
		
		if (bookshelfId == -1) {
			throw error(400, 'Book not specified/ incorrectly mapped.');
		}

		let prismaBookshelf: any;
		let bookshelves: Bookshelf[] = []
			
		if (session) {
			const user = session.user
			const prismaBookshelfProm = prismaClient.prismaBookshelf.findUnique({
				where: { id: bookshelfId },
				select: {
					name: true,
					isDeletable: true,
					creationDate: true,
					books: {
						include: {
							bookshelves: {
								where: {userId: user.user_id},
								select: {
									id: true
								}
							},
							reviews: {
								select: {
									rating: true
								}
							}
						}
					}
				}
			});

			const bookshelvesProm = fetch(`http://${url.host}/api/read/bookshelves/${user.user_id}/names`).then(res => res.json());

			[prismaBookshelf, bookshelves] = await Promise.all([prismaBookshelfProm, bookshelvesProm])
		}
		else {
			prismaBookshelf = await prismaClient.prismaBookshelf.findUnique({
				where: { id: bookshelfId },
				select: {
					name: true,
					isDeletable: true,
					creationDate: true,
					books: {
						include: {
							reviews: {
								select: {
									rating: true
								}
							}
						}
					}
				}
			});
		}
		

		if (prismaBookshelf == null){
			throw error(400, `Bookshelf with id ${bookshelfId} does not exist!`)
		}
		else{
			const bookProms: any = []
			
			prismaBookshelf.books.forEach(prismaBook => {
				bookProms.push(getBookInfoFromGoogleBooksAPI(prismaBook.googleBooksId))
			})

			const booksRes = await Promise.all(bookProms)

			let books: Book[] = []
			booksRes.forEach((bookRes, i) => {
				const prismaBook = prismaBookshelf.books[i]

				const book: Book = readJSONToBook(bookRes);

				let savedBookshelfIDs: number[] = []

				if (session) {
					prismaBook.bookshelves.forEach(bookshelf => {
						savedBookshelfIDs.push(bookshelf.id);
					})
				}
				book.savedBookshelfIDs = savedBookshelfIDs;

				const numRatings:number = prismaBook.reviews.length;
				let avgRating:number = 0;

				if (numRatings > 0){
					const sum = prismaBook.reviews.reduce((partialSum, review) => partialSum + review.rating, 0)
					avgRating = sum / numRatings 
				} 
				book.avgRating = avgRating;
				book.numRatings = numRatings;

				books.push(book)
			})


			const bookshelf: Bookshelf = {
				id: bookshelfId,
				name: prismaBookshelf.name,
				isDeletable: prismaBookshelf.isDeletable,
				creationDate: prismaBookshelf.creationDate,
				books: books
			}
			//console.log(bookshelf)

			return {
				bookshelf: bookshelf,
				bookshelves
			}
			
		}
		
	} catch (err) {
		console.log(err);
		//not authenticated
		throw redirect(307, '/authentication');
	}
}