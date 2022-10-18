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
        // const restBookInfo: any = await getBookInfoFromGoogleBooksAPI(bookId);

        // if (restBookInfo.error) {
        //     throw error(400, '404 Google Book Does not Exist')
        // }


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

        const bookshelves = await prismaClient.prismaBookshelf.findMany({
            where: {
                id: {
                    in: bookshelfIds
                }
            },
            include: {
                books: true
            }
        })
        // console.log(bookshelves)

        const updateProms:any = []
        bookshelves.forEach(bookshelf => {
            const currentBooksInBookshelf: PrismaBook[] = bookshelf.books     
              
            //skip bookshelf if it already has book
            for (const book of currentBooksInBookshelf) {
                if (book.googleBooksId == bookId){
                    //ignore this bookshelf
                    // console.log("ALREADY IN BOOKSHELF")
                    return;
                }
                
            }

            const updateProm = prismaClient.prismaBookshelf.update({
                where:{
                    id: bookshelf.id
                },
                data:{
                    books:{
                        connect:{googleBooksId: bookId}
                    }
                }
            })
            updateProms.push(updateProm)
        })

        const responses = await Promise.all(updateProms);

        responses.forEach(bookshelf => {
            // console.log(bookshelf)
            addedBookshelfIds.push(bookshelf.id)
        })
        // console.log(addedBookshelfIds)

        return new Response(JSON.stringify({addedBookshelfIds: addedBookshelfIds}))
    }
    catch(err){
      throw error(400, `Book not successfully added to bookshelf, error: ${err}`)
    }
}
