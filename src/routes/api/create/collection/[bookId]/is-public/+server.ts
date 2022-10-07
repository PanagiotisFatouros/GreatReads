// import { createNewEntity } from '../../../../../database/mysql';
import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { prismaClient } from '$lib/lucia'
import type { PrismaCollection, Prisma, User } from '@prisma/client'
import type { Collection } from 'src/types/book.type'
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }:RequestEvent){
    const bookId = params.bookId || ""
    if (bookId == ""){
        throw error(400, "Public Collection not created, book not specified")
    }
    const { title, userId } = await request.json()
    let createdPrismaCollection: PrismaCollection
    let createdCollection: Collection
    
    try {
        const newCollectionInput: Prisma.PrismaCollectionCreateInput = {
          title: title,
          creationDate: new Date(),
          isPublic: true,
          upvotes: 0,
          book: {connect: {googleBooksId: bookId}},
          user: {connect: {id: userId}}
        }
        createdPrismaCollection = await prismaClient.prismaCollection.create({data: newCollectionInput})

        const user: User | null = await prismaClient.user.findUnique({
			where: {
				id: createdPrismaCollection.userId
			}
		})
		if (user != null){
			createdCollection = {
				id: createdPrismaCollection.id,
				title: createdPrismaCollection.title,
				creationDate: createdPrismaCollection.creationDate,
				isPublic: createdPrismaCollection.isPublic,
				upvotes: createdPrismaCollection.upvotes,
				user: {
					id: user.id,
					name: user.name,
					profilePic: user.profilePic
				}
			}
			return new Response(JSON.stringify(createdCollection));
        }
    }
    catch(err){
        throw error(400, `Public Collection not created, error: ${err}`)
    }
}
