import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Book, Collection, Review } from 'src/types/book.type';
import type { Prisma } from '@prisma/client';
import { prismaClient } from '../../../../../lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../../../../../lib/scripts';

export async function GET({ params }: RequestEvent) {
	const googleBooksId = params.bookId || '';

	// Checks to see if existing book is in database,

	let targetGoogleBook: Book;
	const response: any = await getBookInfoFromGoogleBooksAPI(googleBooksId);
	// console.log(restBookInfo)

	if (response.error) {
		throw error(400, '404 Google Book Does not Exist');
		// throw error(400, response.error);
	} else {
		const restBookInfo = readJSONToBook(response);
		// Check if book already in database
		let existingBookInDatabase = await prismaClient.prismaBook.findUnique({
			where: { googleBooksId: googleBooksId },
			include: {
				reviews: {
					orderBy: { upvotes: 'desc' },
					include: {
						user: {
							select: {
								id: true,
								name: true,
								profilePic: true
							}
						}
					}
				}
			}
		});
		// console.log(existingBookInDatabase)

		// if yes: proceed normally,
		// else: create new entry for book then proceed
		let reviews: Review[] = [];
		let publicCollections: Collection[] = [];
		let avgRating: number;
		let numRating: number;
		if (existingBookInDatabase == null) {
			let newBookInput: Prisma.PrismaBookCreateInput = {
				googleBooksId: googleBooksId
			};
			await prismaClient.prismaBook.create({ data: newBookInput });
			avgRating = 0;
			numRating = 0;
		} else {
			const prismaReviews = existingBookInDatabase.reviews;

			if (prismaReviews.length == 0) {
				avgRating = 0;
				numRating = 0;
			} else {
				avgRating = 0;
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
								? process.env.PROFILE_PHOTOS_URL + prismaReview.user.id
								: 'default'
						}
					};
					avgRating += review.rating;
					reviews.push(review);
				});

				numRating = reviews.length;
				avgRating /= numRating;
			}

			const prismaPublicCollections = await prismaClient.prismaCollection.findMany({
				where: { bookId: googleBooksId, isPublic: true },
				select: {
					id: true,
					title: true,
					creationDate: true,
					isPublic: true,
					upvotes: true,
					user: {
						select: {
							id: true,
							name: true,
							profilePic: true
						}
					}
				}
			});

			if (prismaPublicCollections != null) {
				prismaPublicCollections.forEach((prismaCollection) => {
					const publicCollection: Collection = {
						id: prismaCollection.id,
						title: prismaCollection.title,
						creationDate: prismaCollection.creationDate,
						isPublic: prismaCollection.isPublic,
						upvotes: prismaCollection.upvotes,
						user: {
							id: prismaCollection.user.id,
							name: prismaCollection.user.name,
							profilePic: prismaCollection.user.profilePic
								? process.env.PROFILE_PHOTOS_URL + prismaCollection.user.id
								: 'default'
						}
					};
					publicCollections.push(publicCollection);
				});
			}
		}

		// creating google book object
		targetGoogleBook = {
			...restBookInfo,

			// hardcoded fields in api
			avgRating: avgRating,
			numRatings: numRating,
			reviews: reviews,
			publicNotes: publicCollections
		};
		// console.log(JSON.stringify(targetGoogleBook))
		return new Response(JSON.stringify(targetGoogleBook));
	}
}
