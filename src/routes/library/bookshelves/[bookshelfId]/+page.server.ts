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
					user: {
						select: {
							id: true,
							name: true,
							profilePic: true
						}
					},
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
				//console.log(prismaBookshelf.books)
				let books: Book[] = []
				for await (const prismaBook of prismaBookshelf.books) {
					const restBookInfo:any = await getBookInfoFromGoogleBooksAPI(prismaBook.googleBooksId)
					const book: Book = readJSONToBook(restBookInfo);

					let savedBookshelfIDs: number[] = []
					prismaBook.bookshelves.forEach(bookshelf => {
						savedBookshelfIDs.push(bookshelf.id);
					})
					book.savedBookshelfIDs = savedBookshelfIDs;

					books.push(book)
				};
				
				const bookshelf: Bookshelf = {
					id: bookshelfId,
					name: prismaBookshelf.name,
					isDeletable: prismaBookshelf.isDeletable,
					creationDate: prismaBookshelf.creationDate,
					user: {
						id: prismaBookshelf.user.id,
						name: prismaBookshelf.user.name,
						profilePic: prismaBookshelf.user.profilePic
					},
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