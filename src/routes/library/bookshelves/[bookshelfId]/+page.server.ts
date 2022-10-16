import type { ServerLoadEvent } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import { redirect } from '@sveltejs/kit';
import type { Bookshelf, Book } from '../../../../types/book.type';
import { prismaClient } from '$lib/lucia';
import { error } from '@sveltejs/kit';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../../../../scripts'

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url, params }: ServerLoadEvent) {
	try {
		
		const session = await auth.validateRequestByCookie(request);
		
		if (session) {

			const user = session.user
            const bookshelfId:number = params.bookshelfId == null ? -1 : parseInt(params.bookshelfId);

			if (bookshelfId == -1) {
				throw error(400, 'Book not specified/ incorrectly mapped.');
			}
			
            const prismaBookshelf = await prismaClient.prismaBookshelf.findUnique({
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
							}
						}
					}
				}
			});
	
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
					prismaBook.bookshelves.forEach(bookshelf => {
						savedBookshelfIDs.push(bookshelf.id);
					})
					book.savedBookshelfIDs = savedBookshelfIDs;

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

				let bookshelves: Bookshelf[] = await (
					await fetch(`http://${url.host}/api/read/bookshelves/${user.user_id}/names`)
				).json();


				return {
					bookshelf: bookshelf,
					bookshelves
				}
				
			}

			
            

		} else {
			//not authenticated
			throw redirect(307, '/authentication');
		}
	} catch (err) {
		console.log(err);
		//not authenticated
		throw redirect(307, '/authentication');
	}
}