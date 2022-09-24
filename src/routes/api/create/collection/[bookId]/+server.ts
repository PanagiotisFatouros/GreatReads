// import { createNewEntity } from '../../../../../database/mysql';
import type { RequestEvent } from '@sveltejs/kit'
import { prismaClient } from '../../../../../lib/lucia'
import type { Collection, Prisma } from '@prisma/client'
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }:RequestEvent){
    const bookId = params.bookId || ""
    const { title, userId } = await request.json()
    let createdCollection: Collection
    
    try {
        // Create user profile, which has username as the user's name in database
        // createdCollectionId = await createCollection(userId, bookId, title)
        // console.log(createdCollectionId)
        const newCollectionInput: Prisma.CollectionCreateInput = {
          title: title,
          creationDate: new Date(),
          isPublic: false,
          upvotes: 0,
          book: {connect: {googleBooksId: bookId}},
          user: {connect: {id: userId}}
        }
        createdCollection = await prismaClient.collection.create({data: newCollectionInput})
        
    }
    catch(err){
      console.log(err)
      return new Response("Collection not successfully created")
    }
    return new Response(`Collection successfully created! New collection: ${JSON.stringify(createdCollection)}`)
}
