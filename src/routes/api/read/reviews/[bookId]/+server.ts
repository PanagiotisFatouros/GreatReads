import type { RequestEvent } from '@sveltejs/kit';
import type { Review } from 'src/types/book.type';
import { prismaClient } from '../../../../../lib/lucia';

export async function GET({ params }: RequestEvent) {
	const bookId = params.bookId || '';

	if (bookId == '') {
		return new Response('Book not specified/ incorrectly mapped.');
	}

	const prismaReviews = await prismaClient.prismaReview.findMany({
		where: { bookId: bookId },
		include: {
			user: {
				select: {
					id: true,
					name: true,
					profilePic: true
				}
			}
		}
	});
	let reviews: Review[] = [];
	prismaReviews.forEach((prismaReview) => {
		const review: Review = {
			id: prismaReview.id,
			title: prismaReview.title,
			comment: prismaReview.comment,
			rating: prismaReview.rating,
			date: prismaReview.creationDate,
			upvotes: prismaReview.upvotes,
			isEdited: prismaReview.isEdited,
			user: {
				id: prismaReview.user.id,
				name: prismaReview.user.name,
				profilePic: prismaReview.user.profilePic
			}
		};
		reviews.push(review);
	});

	if (reviews.length == 0) {
		return new Response(`404 There are no existing reviews for ${bookId} in database`);
	}
	return new Response(JSON.stringify(reviews));
}
