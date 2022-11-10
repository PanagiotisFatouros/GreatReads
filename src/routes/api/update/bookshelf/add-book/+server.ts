import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import type { Prisma, PrismaBook, PrismaBookshelf } from '@prisma/client';
import type { Book, Bookshelf } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	let { bookId, bookshelfId } = await request.json();
	bookshelfId = Number(bookshelfId) ? parseInt(bookshelfId) : -1;
	if (bookshelfId == -1) {
		throw error(400, 'Bookshelf ID is not valid/specified');
	}

	let targetBookshelf;
	let returnedBookshelf: Bookshelf;
	let targetBook: PrismaBook | null;
	try {
		// Check if Book already exists in database, if not then add it
		const restBookInfo: any = await getBookInfoFromGoogleBooksAPI(bookId);

		if (restBookInfo.error) {
			throw error(400, '404 Google Book Does not Exist');
		}

		targetBook = await prismaClient.prismaBook.findUnique({
			where: {
				googleBooksId: bookId
			}
		});
		if (targetBook == null) {
			const newBookInput: Prisma.PrismaBookCreateInput = {
				googleBooksId: bookId
			};
			targetBook = await prismaClient.prismaBook.create({ data: newBookInput });
		}

		// Add Book to Bookshelf
		targetBookshelf = await prismaClient.prismaBookshelf.findUnique({
			where: {
				id: bookshelfId
			},
			include: {
				books: true
			}
		});

		if (targetBookshelf) {
			const currentBooksInBookshelf: PrismaBook[] = targetBookshelf.books;
			currentBooksInBookshelf.forEach((book) => {
				if (book.googleBooksId == bookId) {
					throw error(400, `Book is already in Bookshelf!`);
				}
			});
			targetBookshelf = await prismaClient.prismaBookshelf.update({
				where: {
					id: targetBookshelf.id
				},
				data: {
					books: {
						connect: { googleBooksId: bookId }
					}
				},
				include: {
					books: true,
					user: {
						select: {
							id: true,
							name: true,
							profilePic: true
						}
					}
				}
			});

			let books: Book[] = [];
			for await (const prismaBook of targetBookshelf.books) {
				const restBookInfo: any = await getBookInfoFromGoogleBooksAPI(prismaBook.googleBooksId);
				const book: Book = {
					id: prismaBook.googleBooksId,
					title: restBookInfo.volumeInfo.title,
					authors: restBookInfo.volumeInfo.authors,
					pageCount: restBookInfo.volumeInfo.pageCount,
					// description: restBookInfo.volumeInfo.description,
					genres: restBookInfo.volumeInfo.categories,
					isbn: restBookInfo.volumeInfo.industryIdentifiers[1].identifier,
					datePublished: restBookInfo.volumeInfo.publishedDate,
					imageURL: restBookInfo.volumeInfo.imageLinks.thumbnail
				};
				books.push(book);
			}

			returnedBookshelf = {
				id: targetBookshelf.id,
				name: targetBookshelf.name,
				isDeletable: targetBookshelf.isDeletable,
				creationDate: targetBookshelf.creationDate,
				user: {
					id: targetBookshelf.user.id,
					name: targetBookshelf.user.name,
					profilePic: targetBookshelf.user.profilePic
						? process.env.PROFILE_PHOTOS_URL + targetBookshelf.user.id
						: 'default'
				},
				books: books
			};
			return new Response(JSON.stringify(returnedBookshelf));
		}
	} catch (err) {
		throw error(400, `Book not successfully added to bookshelf, error: ${err}`);
	}
}
