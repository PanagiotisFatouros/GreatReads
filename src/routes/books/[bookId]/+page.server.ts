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
			const bookProm = fetch(`http://${host}/api/read/books/${bookID}/${session.user.user_id}`)
			.then(res => res.json());

			const bookshelvesProm = fetch(`http://${host}/api/read/bookshelves/${session.user.user_id}/names`).then(res => res.json());

			let book: Book;
			let bookshelves: Bookshelf[];

			[book, bookshelves] = await Promise.all([bookProm, bookshelvesProm]);

			// search for list of similar books based on author
			let books: Book[] = [];
			let authors: string[] = book.authors;
			// console.log(book)
			// console.log(`AUTHORS: ${authors}`)

			const similarBookProms:any = [];

			if (authors != undefined) {
				for (const author of authors) {
					similarBookProms.push(fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`).then(res => res.json()))
				};
				
				const similarBooksRes = await Promise.all(similarBookProms);

				for (const response of similarBooksRes) {
					const googleBooks = readGoogleBooksResponse(response)
					books = books.concat(googleBooks)
				};
			}
			

			

			// console.log(books)
			return {
				book: book,
				bookshelves,
				books
			};
		} else {
			//not authenticated
			throw redirect(307, '/authentication/login');
		}
	} catch (err) {
		console.log(err);
		//not authenticated
		throw redirect(307, '/authentication/login');
	}
}
