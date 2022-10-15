import type { ServerLoadEvent } from '@sveltejs/kit';
// import { createNewEntity } from "../../../../database/mysql"
import { auth } from '$lib/lucia';
import type { Book, Bookshelf } from 'src/types/book.type';
import { error, redirect } from '@sveltejs/kit';
import { readGoogleBooksResponse } from '../../../scripts';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url, params }: ServerLoadEvent) {
	try {
		const session = await auth.validateRequestByCookie(request);
		if (session) {
			// authenticated

			const host = url.host;
			// console.log(baseURL);
			// console.log(url);

			const bookID = params.bookId;

			// console.log(request);
			// console.log(params);
			let book: Book = await (
				await fetch(`http://${host}/api/read/books/${bookID}/${session.user.user_id}`)
			).json();

			let bookshelves: Bookshelf[] = await (
				await fetch(`http://${host}/api/read/bookshelves/${session.user.user_id}/names`)
			).json();

			// console.log(book);

			// search for list of similar books based on author
			let books: Book[] = [];
			let authors: string[] = book.authors;
			console.log(book.authors)

			for await (let author of authors) {
                const response = await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`)).json()
                const googleBooks = readGoogleBooksResponse(response)
				books = books.concat(googleBooks)
			}
			
			console.log(books)
			return {
				book: book,
				bookshelves,
				books
			};
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
