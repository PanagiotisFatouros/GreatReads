// import { createNewEntity } from '../../../../../database/mysql';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { PrismaReview } from '@prisma/client';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }: RequestEvent) {
	const reviewId: number = params.reviewId ? parseInt(params.reviewId) : -1;
	if (reviewId == -1) {
		throw error(400, `Review ID not specified/valid, delete review failed`);
	}

	let deletedReview: PrismaReview;
	try {
		deletedReview = await prismaClient.prismaReview.delete({
			where: {
				id: reviewId
			}
		});
	} catch (err) {
		throw error(400, `Review not deleted, unknown error: ${err}`);
	}
	return new Response(JSON.stringify(deletedReview));
}
