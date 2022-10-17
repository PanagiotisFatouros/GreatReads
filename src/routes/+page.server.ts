import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Client, Bookshelf, Book, Review, Collection } from '../types/book.type';
import { prismaClient, auth } from '../lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../scripts';
import { error, redirect } from '@sveltejs/kit';
import type { PrismaBookshelf, PrismaCollection, PrismaBook } from '@prisma/client';


/** @type {import('./$types').PageServerLoad} */
export async function load({request}: ServerLoadEvent) {

    try {
        const session = await auth.validateRequestByCookie(request);

        if (session) {
            const userId = session.user.user_id;

            //TODO: no await
            const bookshelvesProm = prismaClient.prismaBookshelf.findMany({
                where: {
                    userId: userId,
                    isDeletable: false,
                    OR: [
                        {name: 'Favourites'},
                        {name: "Currently Reading"}
                    ]
                },
                include: {
                    books: {
                        take: 8
                    }
                }
            })
            

            const collectionsProm = prismaClient.prismaCollection.findMany({
                take: 3,
                orderBy: {
                    creationDate: 'desc'
                },
                where: {
                    userId: userId
                },
                select: {
                    id: true,
                    title: true,
                    creationDate: true,
                    isPublic: true,
                    upvotes: true,
                    bookId: true,
                    _count: {
                        select: {notes: true}
                    }

                }
            })
            

            const bookProm = prismaClient.prismaBook.findMany({
                take: 5,
                orderBy: {
                    reviews: {
                        _count: 'desc'
                    }
                },
                include: {
                    reviews: true
                }
            })

            let prismaBookshelves:any, prismaCollections:any, prismaPopularBooks:any;
            
            //get everything from database
            [prismaBookshelves, prismaCollections, prismaPopularBooks] = await Promise.all([bookshelvesProm, collectionsProm, bookProm])

            // console.log(prismaBookshelves);
            // console.log(prismaCollections)
            // console.log(prismaPopularBooks)

            const bookshelfBooksProms:any = []
            prismaBookshelves.forEach(bookshelf => {
                const bookProms:any = []

                bookshelf.books.forEach(book => {
                    bookProms.push(getBookInfoFromGoogleBooksAPI(book.googleBooksId))
                })

                bookshelfBooksProms.push(Promise.all(bookProms))
            })

            const collectionBookProms:any = []
            prismaCollections.forEach(prismaCollection => {
                collectionBookProms.push(getBookInfoFromGoogleBooksAPI(prismaCollection.bookId))
            })

            const popBooksProms:any = []
            prismaPopularBooks.forEach(book => {
                popBooksProms.push(getBookInfoFromGoogleBooksAPI(book.googleBooksId))
            })

            //get everything from google books api
            const [bookshelfBooks, collectionBooks, popBooksRes] = await Promise.all([Promise.all(bookshelfBooksProms), Promise.all(collectionBookProms), Promise.all(popBooksProms)])

            // console.log(bookshelfBooks)

            const bookshelves: Bookshelf[] = []

            bookshelfBooks.forEach((booksRes, i) => {
                const prismaBookshelf = prismaBookshelves[i];

                const books: Book[] = []
                booksRes.forEach(bookRes => {
                    books.push(readJSONToBook(bookRes))
                })

                const bookshelf: Bookshelf = {
                    id: prismaBookshelf.id,
                    name: prismaBookshelf.name,
                    isDeletable: prismaBookshelf.isDeletable,
                    creationDate: prismaBookshelf.creationDate,
                    books: books
                }

                bookshelves.push(bookshelf)
            })

            //for safety
            const favsBookshelf: Bookshelf | undefined = bookshelves.find(bookshelf => bookshelf.name == "Favourites")

            const readingBookshelf: Bookshelf | undefined = bookshelves.find(bookshelf => bookshelf.name == "Currently Reading")

            // console.log(favsBookshelf)
            // console.log(readingBookshelf)

            const collections:Collection[] = []

            collectionBooks.forEach((bookRes, i) => {
                const prismaCollection = prismaCollections[i]

                const collection:Collection = {
                    id: prismaCollection.id,
                    title: prismaCollection.title,
                    creationDate: prismaCollection.creationDate,
                    isPublic: prismaCollection.isPublic,
                    upvotes: prismaCollection.upvotes,
                    numNotes: prismaCollection._count.notes,
                    bookId: prismaCollection.bookId,
                    imgURL: readJSONToBook(bookRes).imageURL
                }
                collections.push(collection)
            })
            // console.log(collections)

            const popularBooks: Book[] = []
            popBooksRes.forEach((bookRes, i) => {
                const book: Book = readJSONToBook(bookRes);
                const prismaBook = prismaPopularBooks[i];

                if (prismaBook.reviews) {
                    const numRatings = prismaBook.reviews?.length
                    const avgRating = prismaBook.reviews?.reduce((total, rev) => total + rev.rating, 0) / numRatings;

                    book.numRatings = numRatings;
                    book.avgRating = avgRating;

                }
                
                
                popularBooks.push(book)
            })

            // console.log(popularBooks)


            return {
                favsBookshelf,
                readingBookshelf,
                collections,
                popularBooks
            }

        }
        else {
			//not authenticated
			throw redirect(307, '/authentication/login');
		}
        

    }
    catch (err) {
        console.log(err);
        throw redirect(307, '/authentication/login');
    }
}