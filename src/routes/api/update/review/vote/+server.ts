import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { PrismaReview } from '@prisma/client';
import type { Review } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {

    let { id, voteChange } = await request.json()
    const reviewId = Number(id) ? parseInt(id) : -1
    if (reviewId == -1) {
        throw error(400, 'Review ID is not valid/specified')
    }

    let updatedPrismaReview: PrismaReview
    let returnedReview: Review
    try {

        const existingPrismaReview = await prismaClient.prismaReview.findUnique({
            where: {
                id: reviewId
            },
            include: {
                user: true
            }
        })

        

        if (existingPrismaReview != null) {
            const voteCount = existingPrismaReview.upvotes + voteChange

            updatedPrismaReview = await prismaClient.prismaReview.update({
                where: {
                    id: reviewId
                },
                data: {
                    upvotes: voteCount
                }
            })

            return new Response(JSON.stringify({newVotes: voteCount}))
        }
        else {
            throw error(404, "Can't find target review in database")
        }
    }
    catch (err) {
        throw error(400, `Review not succesfully upvoted, error: ${err}`)
    }
}