import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Review, Client } from '../../../../types/book.type';
import { prismaClient } from '../../../../lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../../../../lib/scripts';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: ServerLoadEvent) {
    const userId = params.userId;
    // console.log(userId)

    try {
        let reviews: Review[] = []


        const prismaUser = await prismaClient.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
                id: true,
                profilePic: true,
                reviews: {
                    include: {
                        book: true
                    }
                }
            }
        });


        if (prismaUser?.reviews) {
            console.log(prismaUser);

            const user: Client = {
                id: prismaUser.id,
                name: prismaUser.name,
                profilePic: prismaUser.profilePic ? process.env.PROFILE_PHOTOS_URL + prismaUser.id : 'default'
            }

            const bookProms: any = []

            prismaUser.reviews.forEach(review => {
                bookProms.push(getBookInfoFromGoogleBooksAPI(review.book.googleBooksId))
            })

            const booksRes = await Promise.all(bookProms);

            booksRes.forEach((book, i) => {
                const review = prismaUser.reviews[i]

                let clientReview: Review = {
                    id: review.id,
                    title: review.title,
                    comment: review.comment,
                    rating: review.rating,
                    date: review.creationDate,
                    upvotes: review.upvotes,
                    isEdited: review.isEdited,
                    img: readJSONToBook(book).imageURL
                };
                reviews.push(clientReview);
            })

            console.log(reviews)

            return {
                user,
                reviews
            }
        }



    }
    catch (err) {
        console.log(err);
    }
}