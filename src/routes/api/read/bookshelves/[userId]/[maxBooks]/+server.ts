import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Bookshelf, Book } from 'src/types/book.type';
import { prismaClient } from '$lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { auth } from '$lib/lucia';

export async function GET({ request, params }: RequestEvent) {
	
    try {
        console.log(request)

        //const session = await auth.validateRequest(request);
        //console.log(session)
        const userId = params.userId || '';
        const maxBookshelves = parseInt(params.maxBookshelves || '-1');
        let prismaBookshelves;


        if (maxBookshelves == -1) {
            //return all
            prismaBookshelves = await prismaClient.prismaBookshelf.findMany({
                where: { userId: userId },
                select: {
                    id: true,
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
        }
        else {
            prismaBookshelves = await prismaClient.prismaBookshelf.findMany({
                take: maxBookshelves,
                where: { userId: userId },
                select: {
                    id: true,
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
        }

        if (prismaBookshelves == null){
            throw error(400, `Bookshelves not found!`)
        }
        else{

            let bookshelves: Bookshelf[] = []
            for await (const prismaBookshelf of prismaBookshelves) {
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

                }

                //console.log(books)
                const bookshelf: Bookshelf = {
                    id: prismaBookshelf.id,
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

                bookshelves.push(bookshelf);
            }

            return new Response(JSON.stringify(bookshelves))
        }
    }
    catch (err){
        throw error(400, `Bookshelves not successfully retrevied, error: ${err}`)
	}
}