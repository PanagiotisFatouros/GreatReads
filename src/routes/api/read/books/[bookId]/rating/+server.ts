import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Prisma, PrismaBook } from '@prisma/client';
import { prismaClient } from '$lib/lucia';

export async function GET({ params }: RequestEvent) {
	const googleBooksId = params.bookId || '';

	if (googleBooksId === '') {
		throw error(400, 'Book Id invalid / not specified');
	}
    else{

        let numRatings = 0
        let avgRating = 0
        let existingBookInDatabase = await prismaClient.prismaBook.findUnique({
            where:{
                googleBooksId: googleBooksId
            }
        })

        if (existingBookInDatabase == null) {
			let newBookInput: Prisma.PrismaBookCreateInput = {
				googleBooksId: googleBooksId
			};
			await prismaClient.prismaBook.create({ data: newBookInput });
        }
        else {
            const reviews = await prismaClient.prismaReview.findMany({
                where:{
                    bookId: googleBooksId
                },
                select:{
                    rating: true
                }
            })

            numRatings = reviews.length
            
            if (numRatings > 0){
                const sum = reviews.reduce((partialSum, review) => partialSum + review.rating, 0)
                avgRating = sum / numRatings 
            } 
        }

        const returnedRatingObject = {
            avgRating: avgRating,
            numRatings: numRatings
        }
        return new Response(JSON.stringify(returnedRatingObject)); 
    }
}


