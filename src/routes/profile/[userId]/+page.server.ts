import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Client, Bookshelf, Book, Review } from '../../../types/book.type';
import { prismaClient } from '../../../lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../../../scripts';
import type { PrismaBookshelf } from '@prisma/client';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}: ServerLoadEvent) {
    const userId = params.userId;
    // console.log(userId)

    try {
        let user: Client
        let favsBookshelf: Bookshelf | undefined
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
                        },
                        _count: {
                            select: {books: true}
                        }
                    }
                }
            }
		});

        const favBookProms:any = []
        let favPrismaBookshelf: PrismaBookshelf | undefined;

        if (prismaUser != null) {
            prismaUser.bookshelves.forEach(bookshelf => {
                if (bookshelf.name == 'Favourites') {
                    favPrismaBookshelf = bookshelf
                    let books: Book[] = []

                    bookshelf.books.forEach(book => {
                        favBookProms.push(getBookInfoFromGoogleBooksAPI(book.googleBooksId))
                    })
                    // for await (const book of bookshelf.books) {
                    //     const googleResponse: any = await getBookInfoFromGoogleBooksAPI(book.googleBooksId);

		            //     books.push(readJSONToBook(googleResponse));
                    // }

                    

                }
                else if (bookshelf.name == 'Finished Reading') {
                    numBooksRead = bookshelf._count.books;
                }
            })

            const reviewBookProms:any = []

            prismaUser.reviews.forEach(prismaReview => {
                reviewBookProms.push(getBookInfoFromGoogleBooksAPI(prismaReview.book.googleBooksId))
            })

            const [favBooksRes, reviewBooksRes] = await Promise.all([Promise.all(favBookProms), Promise.all(reviewBookProms)])

            let books:Book[] = []
            favBooksRes.forEach(book => {
                books.push(readJSONToBook(book))
            })
            
            if (favPrismaBookshelf) {
                favsBookshelf = {
                    id: favPrismaBookshelf.id,
                    name: favPrismaBookshelf.name,
                    isDeletable: favPrismaBookshelf.isDeletable,
                    creationDate: favPrismaBookshelf.creationDate,
                    books: books
                }
            }
            
            let totalRatings = 0;
            reviewBooksRes.forEach((book, i) => {
                const prismaReview = prismaUser.reviews[i]

                let review: Review = {
                    id: prismaReview.id,
                    title: prismaReview.title,
                    comment: prismaReview.comment,
                    rating: prismaReview.rating,
                    date: prismaReview.creationDate,
                    upvotes: prismaReview.upvotes,
                    isEdited: prismaReview.isEdited,
                    img: readJSONToBook(book).imageURL
                }
                reviews.push(review);
                totalRatings += review.rating;
            })
            avgRating = totalRatings / reviews.length;

            
            user = {
                id: prismaUser.id,
                name: prismaUser.name,
                bio: prismaUser.bio,
                profilePic:  prismaUser.profilePic ? process.env.PROFILE_PHOTOS_URL + prismaUser.id : 'default',
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
    catch (err) {
        console.log(err);
    }
}