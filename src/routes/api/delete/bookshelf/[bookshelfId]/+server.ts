// import { createNewEntity } from '../../../../../database/mysql';
import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { prismaClient } from '$lib/lucia'
import type { PrismaBookshelf } from '@prisma/client'
 
/** @type {import('./$types').RequestHandler} */
export async function DELETE ({ params }:RequestEvent){
    const bookshelfId: number = params.bookshelfId? parseInt(params.bookshelfId) : -1

    if (bookshelfId == -1){
        throw error(400, `Bookshelf ID not specified/valid, delete bookshelf failed`)
    }
    let deletedBookshelf: PrismaBookshelf
    try {
        
        const targetBookshelf = await prismaClient.prismaBookshelf.findUnique({
            where: {
                id: bookshelfId
            }
        })

        if (targetBookshelf?.isDeletable == true){
            deletedBookshelf = await prismaClient.prismaBookshelf.delete({
                where: {
                    id: targetBookshelf.id
                }
            })
        }
        else {
            throw error(400, `The Bookshelf you are trying to delete is not deletable! Bookshelf: 
            ${JSON.stringify(targetBookshelf)}`)
        }
        
    }
    catch(err){
        throw error(400, `Bookshelf not deleted, unknown error: ${err}`)
    }
    return new Response(`Bookshelf successfully deleted! Deleted bookshelf: ${JSON.stringify(deletedBookshelf)}`)
}
