// import { createNewEntity } from '../../../../../database/mysql';
import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { prismaClient } from '$lib/lucia'
import type { PrismaCollection } from '@prisma/client'
 
/** @type {import('./$types').RequestHandler} */
export async function DELETE ({ params }:RequestEvent){
    const collectionId: number = params.collectionId? parseInt(params.collectionId) : -1
    if (collectionId == -1){
        throw error(400, `Collection ID not specified/valid, delete collection failed!`)
    }
    
    let deletedCollection: PrismaCollection
    try {

        deletedCollection = await prismaClient.prismaCollection.delete({
            where:{
                id: collectionId
            }
        })    
        
    }
    catch(err){
        throw error(400, `Collection not deleted, unknown error: ${err}`)
    }
    return new Response(JSON.stringify(deletedCollection))
}
