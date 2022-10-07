import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Bookshelf, Book } from 'src/types/book.type';
import { prismaClient } from '$lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';

export async function GET({ params }: RequestEvent) {
	const bookshelfId: number = params.bookshelfId == null ? -1 : parseInt(params.bookshelfId);

	if (bookshelfId == -1) {
		throw error(400, 'Book not specified/ incorrectly mapped.');
	}
    try {
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
                books: true
            }
        });

        if (prismaBookshelf == null){
            throw error(400, `Bookshelf with id ${bookshelfId} does not exist!`)
        }
        else{
            console.log(prismaBookshelf.books)
            let books: Book[] = []
            for await (const prismaBook of prismaBookshelf.books) {
                const restBookInfo:any = await getBookInfoFromGoogleBooksAPI(prismaBook.googleBooksId)
                const book: Book = {
                    id: prismaBook.googleBooksId,
			        title: restBookInfo.volumeInfo.title,
			        authors: restBookInfo.volumeInfo.authors,
			        pageCount: restBookInfo.volumeInfo.pageCount,
			        // description: restBookInfo.volumeInfo.description,
			        genres: restBookInfo.volumeInfo.categories,
			        isbn: restBookInfo.volumeInfo.industryIdentifiers[1].identifier,
			        datePublished: restBookInfo.volumeInfo.publishedDate,
			        imageURL: restBookInfo.volumeInfo.imageLinks.thumbnail,
                }
                books.push(book)
            };
            
            console.log(books)
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
            return new Response(`Bookshelf ${bookshelfId} successfully retrieved, bookshelf: ${JSON.stringify(bookshelf)}`)
        }
    }
    catch (err){
        throw error(400, `Bookshelf not successfully retrevied, error: ${err}`)
	}
}