import type { ServerLoadEvent } from '@sveltejs/kit';
// import { createNewEntity } from "../../../../database/mysql"
import { auth } from '$lib/lucia';
import type { Book, Bookshelf } from 'src/types/book.type';
import { error, redirect } from '@sveltejs/kit';
import { readGoogleBooksResponse } from '../../../scripts';
import { prismaClient } from '$lib/lucia';

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
			let similarBooks: Book[] = [];
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
					similarBooks = similarBooks.concat(googleBooks)
				};

				
				//make list of ids
				const similarBookIds: string[] = []
				similarBooks.forEach(book => {
					similarBookIds.push(book.id)

					book.avgRating = 0;
					book.numRatings = 0;
				})

				//get avgRating for each book
				const prismaBooks = await prismaClient.prismaBook.findMany({
                    where: {
                        googleBooksId: {in: similarBookIds}
                    },
                    select: {
                        googleBooksId: true,
                        reviews: {
                            select: {
                                rating: true
                            }
                        }
                    }
                })

				prismaBooks.forEach(prismaBook => {
					const book:Book | undefined = similarBooks.find(b => b.id == prismaBook.googleBooksId)

					if (book != undefined) {
						const numRatings:number = prismaBook.reviews.length;
                        let avgRating:number = 0;

                        if (numRatings > 0){
                            const sum = prismaBook.reviews.reduce((partialSum, review) => partialSum + review.rating, 0)
                            avgRating = sum / numRatings 
                        } 
                        book.avgRating = avgRating;
                        book.numRatings = numRatings;
					}
				})

				//sort by rating 
				similarBooks.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
				
				//take 8
				similarBooks = similarBooks.slice(0, 8)
			}
			

			

			// console.log(books)
			return {
				book: book,
				bookshelves,
				similarBooks
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
