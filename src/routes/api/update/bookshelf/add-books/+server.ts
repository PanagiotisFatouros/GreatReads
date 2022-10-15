import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import type { Prisma, PrismaBook, PrismaBookshelf } from '@prisma/client';
import type { Book, Bookshelf } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	
    let { bookId, bookshelfIds } = await request.json()

    if (bookshelfIds.length == 0 ){
        throw error(400, 'Bookshelf IDs not specified')
    }

    let targetBookshelf 
    // let returnedBookshelf: Bookshelf
    let targetBook: PrismaBook | null;

    let addedBookshelfIds:number[] = []

    try {
        // Check if Book already exists in database, if not then add it
        const restBookInfo: any = await getBookInfoFromGoogleBooksAPI(bookId);

        if (restBookInfo.error) {
            throw error(400, '404 Google Book Does not Exist')
        }


        targetBook = await prismaClient.prismaBook.findUnique({
            where:{
                googleBooksId: bookId
            }
        })
        if (targetBook == null){
            const newBookInput: Prisma.PrismaBookCreateInput = {
				googleBooksId: bookId
			};
            targetBook = await prismaClient.prismaBook.create({data: newBookInput})
        }

        for await (const bookshelfId of bookshelfIds) {
            // Add Book to Bookshelf
            targetBookshelf = await prismaClient.prismaBookshelf.findUnique({
                where:{
                    id: bookshelfId
                },
                include: {
                    books: true
                }
            })

            if (targetBookshelf){
                const currentBooksInBookshelf: PrismaBook[] = targetBookshelf.books     
                
                for (const book of currentBooksInBookshelf) {
                    if (book.googleBooksId == bookId){
                        //throw error(400, `Book is already in Bookshelf!`)
                        
                        //ignore this book
                        continue;
                    }
                }
                
                targetBookshelf = await prismaClient.prismaBookshelf.update({
                    where:{
                        id: targetBookshelf.id
                    },
                    data:{
                        books:{
                            connect:{googleBooksId: bookId}
                        }
                    }
                })

                addedBookshelfIds.push(targetBookshelf.id);
    
                // returnedBookshelf = {
                //     id: targetBookshelf.id,
                //     name: targetBookshelf.name,
                //     isDeletable: targetBookshelf.isDeletable,
                //     creationDate: targetBookshelf.creationDate,
                //     user: {
                //         id: targetBookshelf.user.id,
                //         name: targetBookshelf.user.name,
                //         profilePic: targetBookshelf.user.profilePic
                //     },
                //     books: books
                // }
                // return new Response(JSON.stringify(returnedBookshelf));
            }
        }
        return new Response(JSON.stringify({addedBookshelfIds: addedBookshelfIds}))
    }
    catch(err){
      throw error(400, `Book not successfully added to bookshelf, error: ${err}`)
    }
}
