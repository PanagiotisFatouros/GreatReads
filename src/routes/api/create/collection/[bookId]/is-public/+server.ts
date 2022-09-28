// import { createNewEntity } from '../../../../../database/mysql';
import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { prismaClient } from '$lib/lucia'
import type { PrismaCollection, Prisma } from '@prisma/client'
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }:RequestEvent){
    const bookId = params.bookId || ""
    if (bookId == ""){
        throw error(400, "Public Collection not created, book not specified")
    }
    const { title, userId } = await request.json()
    let createdCollection: PrismaCollection
    
    try {
        // Create user profile, which has username as the user's name in database
        // createdCollectionId = await createCollection(userId, bookId, title)
        // console.log(createdCollectionId)
        const newCollectionInput: Prisma.PrismaCollectionCreateInput = {
          title: title,
          creationDate: new Date(),
          isPublic: true,
          upvotes: 0,
          book: {connect: {googleBooksId: bookId}},
          user: {connect: {id: userId}}
        }
        createdCollection = await prismaClient.prismaCollection.create({data: newCollectionInput})
        
    }
    catch(err){
        console.log(err)
        throw error(400, "Public Collection not created, unknown error")
    }
    return new Response(`Public Collection successfully created! New collection: ${JSON.stringify(createdCollection)}`)
}
