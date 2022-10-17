import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Bookshelf, Book } from 'src/types/book.type';
import { prismaClient } from '$lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { auth } from '$lib/lucia';
import { readJSONToBook } from '../../../../../../scripts';
import { book } from 'tests/values';
import type { PrismaBookshelf } from '@prisma/client';

export async function GET({ params }: RequestEvent) {
	
    try {
        //console.log(request)

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
                    books: {
                        take: 3
                    }
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
                    books: {
                        take: 3
                    }
                }
            });
        }
        //console.log(prismaBookshelves);

        if (prismaBookshelves == null){
            throw error(400, `Bookshelves not found!`)
            //return new Response(JSON.stringify([]));
        }
        else{

            const bookshelfPromises:any = []

            prismaBookshelves.forEach(prismaBookshelf => {
                const bookPromises:any = []

                prismaBookshelf.books.forEach(prismaBook => {
                    bookPromises.push(getBookInfoFromGoogleBooksAPI(prismaBook.googleBooksId))
                })

                bookshelfPromises.push(Promise.all(bookPromises))
            })

            const bookshelfRes = await Promise.all(bookshelfPromises);

            let bookshelves: Bookshelf[] = []
            
            bookshelfRes.forEach((bookshelfRes, i) => {
                const prismaBookshelf = prismaBookshelves[i]

                const books:Book[] = []
                bookshelfRes.forEach(bookRes => {
                    books.push(readJSONToBook(bookRes))
                })

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
            })

            //console.log(bookshelves)
            return new Response(JSON.stringify(bookshelves))
        }
    }
    catch (err){
        throw error(400, `Bookshelves not successfully retrieved, error: ${err}`)
	}
}