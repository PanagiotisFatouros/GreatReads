import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { PrismaReview } from '@prisma/client';
import type { Review } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	let { id } = await request.json();
	const reviewId = Number(id) ? parseInt(id) : -1;
	if (reviewId == -1) {
		throw error(400, 'Review ID is not valid/specified');
	}

	let updatedPrismaReview: PrismaReview;
	let returnedReview: Review;
	try {
		const existingPrismaReview = await prismaClient.prismaReview.findUnique({
			where: {
				id: reviewId
			},
			include: {
				user: true
			}
		});

		if (existingPrismaReview != null) {
			updatedPrismaReview = await prismaClient.prismaReview.update({
				where: {
					id: reviewId
				},
				data: {
					upvotes: existingPrismaReview.upvotes + 1
				}
			});

			returnedReview = {
				id: reviewId,
				title: updatedPrismaReview.title,
				comment: updatedPrismaReview.comment,
				rating: updatedPrismaReview.rating,
				date: updatedPrismaReview.creationDate,
				upvotes: updatedPrismaReview.upvotes,
				isEdited: updatedPrismaReview.isEdited,
				user: {
					id: existingPrismaReview.user.id,
					name: existingPrismaReview.user.name,
					profilePic: existingPrismaReview.user.profilePic
						? process.env.PROFILE_PHOTOS_URL + existingPrismaReview.user.id
						: 'default'
				}
			};
			return new Response(JSON.stringify(returnedReview));
		} else {
			throw error(404, "Can't find target review in database");
		}
	} catch (err) {
		throw error(400, `Review not succesfully upvoted, error: ${err}`);
	}
}
