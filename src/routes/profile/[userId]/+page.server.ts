import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Client, Bookshelf, Book, Review } from '../../../types/book.type';
import { prismaClient } from '../../../lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../../../scripts';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}: ServerLoadEvent) {
    const userId = params.userId;
    // console.log(userId)

    try {
        let user: Client
        let favsBookshelf: Bookshelf | null = null
        let numBooksRead: number = 0;
        let reviews: Review[] = []
        let avgRating: number = 0;


        const prismaUser = await prismaClient.user.findUnique({
			where: { id: userId },
			select: { 
                id: true,
                name: true,
                bio: true,
                profilePic: true,
                favAuthor: true,
                favBook: true,
                favGenre: true,
                reviews: {
                    take: 3,
                    include: {
                        book: true
                    }
                },
                bookshelves: {
                    where: {
                        isDeletable: false,
                        OR: [
                            {name: 'Favourites'},
                            {name: "Finished Reading"}
                        ]
                    },
                    include: {
                        books: {
                            take: 8
                        }
                    }
                }
            }
		});

        if (prismaUser != null) {
            for await (const bookshelf of prismaUser.bookshelves) {
                if (bookshelf.name == 'Favourites') {
                    let books: Book[] = []

                    for await (const book of bookshelf.books) {
                        const googleResponse: any = await getBookInfoFromGoogleBooksAPI(book.googleBooksId);

		                books.push(readJSONToBook(googleResponse));
                    }

                    favsBookshelf = {
                        id: bookshelf.id,
                        name: bookshelf.name,
                        isDeletable: bookshelf.isDeletable,
                        creationDate: bookshelf.creationDate,
                        books: books
                    }

                }
                else if (bookshelf.name == 'Finished Reading') {
                    numBooksRead = bookshelf.books.length;
                }
            }

            let totalRatings = 0;
            for await (const prismaReview of prismaUser.reviews) {
                const googleResponse: any = await getBookInfoFromGoogleBooksAPI(prismaReview.book.googleBooksId);

                let review: Review = {
                    id: prismaReview.id,
                    title: prismaReview.title,
                    comment: prismaReview.comment,
                    rating: prismaReview.rating,
                    date: prismaReview.creationDate,
                    upvotes: prismaReview.upvotes,
                    isEdited: prismaReview.isEdited,
                    img: readJSONToBook(googleResponse).imageURL
                }
                reviews.push(review);
                totalRatings += review.rating;
            }
            avgRating = totalRatings / reviews.length;

            if (favsBookshelf != null) {
                user = {
                    id: prismaUser.id,
                    name: prismaUser.name,
                    bio: prismaUser.bio,
                    profilePic: prismaUser.profilePic || '',
                    favAuthor: prismaUser.favAuthor == '' ? '-' : prismaUser.favAuthor,
                    favGenre: prismaUser.favGenre  == '' ? '-' : prismaUser.favGenre,
                    favsBookshelf: favsBookshelf,
                    numBooksRead: numBooksRead,
                    reviews: reviews,
                    avgRating: avgRating
                }
                // console.log(user)

                return {
                    user
                }
            }

        }

    }
    catch (err) {
        console.log(err);
    }
}