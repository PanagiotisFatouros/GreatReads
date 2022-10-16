import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { Prisma, PrismaReview, User } from '@prisma/client';
import type { Review } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }: RequestEvent) {
	const bookId = params.bookId || '';
	if (bookId == '') {
		throw error(404, 'Book for Review not found/specified');
	}
	const { title, comment, rating, userId } = await request.json()
	let createdPrismaReview: PrismaReview
	let createdReview: Review

	try {
		const newReviewInput: Prisma.PrismaReviewCreateInput = {
			title: title,
			comment: comment,
			rating: rating,
			creationDate: new Date(),
			upvotes: 0,
			isEdited: false,
			book: { connect: { googleBooksId: bookId } },
			user: { connect: { id: userId } }
		}
		createdPrismaReview = await prismaClient.prismaReview.create({ data: newReviewInput })

		const user: User | null = await prismaClient.user.findUnique({
			where: {
				id: createdPrismaReview.userId
			}
		})
		if (user != null) {
			createdReview = {
				id: createdPrismaReview.id,
				title: createdPrismaReview.title,
				comment: createdPrismaReview.comment,
				rating: createdPrismaReview.rating,
				date: createdPrismaReview.creationDate,
				upvotes: createdPrismaReview.upvotes,
				isEdited: createdPrismaReview.isEdited,
				user: {
					id: user.id,
					name: user.name,
					profilePic: user.profilePic ? process.env.PROFILE_PHOTOS_URL + user.id : "default"
				}
			}
			return new Response(JSON.stringify(createdReview))
		}
	}
	catch (err) {
		console.log(err)
		throw error(404, `Review not successfully created, error: ${err}`)
	}
}
