import type { RequestEvent } from '@sveltejs/kit'
import { prismaClient } from '../../../../../lib/lucia'
import type { Prisma, PrismaReview } from '@prisma/client'
 

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }:RequestEvent){

    const bookId = params.bookId || ""
    if (bookId == "") {
      return new Response("Book for Review not found/specified")
    }

    const { title, comment, rating, userId } = await request.json()
    let createdReview: PrismaReview    
    try {
        const newReviewInput: Prisma.PrismaReviewCreateInput = {
          title: title,
          comment: comment,
          rating: rating,
          creationDate:  new Date(),
          upvotes: 0,
          isEdited: false,
          book: {connect:{googleBooksId: bookId}},
          user: {connect:{id: userId}}
        }

        createdReview = await prismaClient.prismaReview.create({data: newReviewInput})
      }
    catch(err){
      console.log(err)
      return new Response("Review not successfully created")
    }
    return new Response(`Review successfully created! New Review has ID ${JSON.stringify(createdReview)}`)
}