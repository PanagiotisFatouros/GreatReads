import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { PrismaBook, PrismaBookshelf } from '@prisma/client';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import type { Book, Bookshelf } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	
    let { bookId, bookshelfIds } = await request.json()
    
    
    if (bookshelfIds.length == 0 ){
        throw error(400, 'Bookshelf IDs not specified')
    }

    let targetBookshelf;
    let targetBook: PrismaBook | null;
    let removedBookshelfIds:number[] = []
    try {
        // Check if Book already exists in database, if not then add it
        targetBook = await prismaClient.prismaBook.findUnique({
            where:{
                googleBooksId: bookId
            }
        })
        
        if (targetBook == null){
            throw error(400, "Target Book does not exist in database")
        }
        else {
            
            for await (const bookshelfId of bookshelfIds) {
                targetBookshelf = await prismaClient.prismaBookshelf.update({
                    where:{
                        id: bookshelfId
                    },
                    data:{
                        books:{
                            disconnect: {
                                googleBooksId: bookId
                            }
                        }
                    }
                })

                removedBookshelfIds.push(bookshelfId);

            }

            return new Response(JSON.stringify(removedBookshelfIds));
        }
    
    }
    catch(err){
      throw error(400, `Book not successfully removed from bookshelf, error: ${err}`)
    }
}
