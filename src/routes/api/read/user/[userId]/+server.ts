import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '../../../../../lib/lucia';
import type { Client, Review } from '../../../../../types/book.type';


export async function GET({ params }: RequestEvent) {
	const userId = params.userId || null;
	let client: Client;

	if (userId == null) {
		return new Response('No User specified');
	} else {
		const prismaUser = await prismaClient.user.findUnique({
			where: { id: userId },
			include: { reviews: true }
		});
		let clientReviews: Review[] = [];
		if (prismaUser?.reviews) {
			prismaUser?.reviews.forEach((review) => {
				let clientReview: Review = {
					id: review.id,
					title: review.title,
					comment: review.comment,
					rating: review.rating,
					date: review.creationDate,
					upvotes: review.upvotes,
					isEdited: review.isEdited,
					user: {
						name: prismaUser.name,
						id: prismaUser.id,
						profilePic: process.env.PROFILE_PHOTOS_URL + prismaUser.id + "." + prismaUser.profilePicExt
					}
				};
				clientReviews.push(clientReview);
			});
		}
		client = {
			name: prismaUser?.name || '',
			id: prismaUser?.id || '',
			profilePic: process.env.PROFILE_PHOTOS_URL + prismaUser?.id + "." + prismaUser?.profilePicExt || '',
			bio: prismaUser?.bio || '',
			reviews: clientReviews
		};
		return new Response(JSON.stringify(client));
	}
}
