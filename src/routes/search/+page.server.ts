import type { ServerLoadEvent } from '@sveltejs/kit';
import { searchTypes } from '../../types/searchTypes.enum';
import type { Book, Client, Bookshelf } from '../../types/book.type'
import { getCriteria, readGoogleBooksResponse } from '../../scripts'
import { prismaClient } from '$lib/lucia';
import { getSession } from 'lucia-sveltekit/load';


/** @type {import('./$types').PageServerLoad} */
export async function load(event: ServerLoadEvent) {
	const url = event.url;
    const host = url.host
    const session = await getSession(event);

    let books: Book[] = [];
    let bookshelves: Bookshelf[] = [];

    let users: Client[] = [];

    try {
		
        console.log(url.searchParams);

        let searchType:string = ''
        let searchString:string = ''

        // assumes only one search parameter is entered
        url.searchParams.forEach((val, key) => {
            console.log(`key: ${key}, val: ${val}`);

            if (Object.values<string>(searchTypes).includes(key)) {
                searchType = key;
                searchString = val;
            }
        })

        if (searchType != '') {
            if (searchType == searchTypes.books || searchType == searchTypes.authors || searchType == searchTypes.genres ){
                const searchCriteria = `${getCriteria(searchType)}:${searchString}`
                console.log(searchCriteria)
                
                const searchProm = fetch(`https://www.googleapis.com/books/v1/volumes?q=?${searchCriteria}`).then(res => res.json())

                const bookshelvesProm = fetch(`http://${host}/api/read/bookshelves/${session.user.user_id}/names`).then(res => res.json())

                let searchRes;

                [searchRes, bookshelves] = await Promise.all([searchProm, bookshelvesProm]);
                
                const googleBooks = readGoogleBooksResponse(searchRes);

                // get ratings from database 
                const bookIds:string[] = []
                googleBooks.forEach(googleBook => {
                    bookIds.push(googleBook.id)
                })

                const prismaBooks = await prismaClient.prismaBook.findMany({
                    where: {
                        googleBooksId: {in: bookIds}
                    },
                    select: {
                        googleBooksId: true,
                        bookshelves: {
                            where: {userId: session.user.user_id},
                            select: {
                                id: true
                            }
                        },
                        reviews: {
                            select: {
                                rating: true
                            }
                        }
                    }
                })
                console.log(prismaBooks)

                googleBooks.forEach(book => {
                    const prismaBook = prismaBooks.find(pBook => pBook.googleBooksId == book.id)

                    if (prismaBook == undefined) {
                        book.avgRating = 0;
                        book.numRatings = 0;
                        book.savedBookshelfIDs = [];
                    }
                    else {
                        const numRatings:number = prismaBook.reviews.length;
                        let avgRating:number = 0;

                        if (numRatings > 0){
                            const sum = prismaBook.reviews.reduce((partialSum, review) => partialSum + review.rating, 0)
                            avgRating = sum / numRatings 
                        } 
                        book.avgRating = avgRating;
                        book.numRatings = numRatings;

                        let savedBookshelfIDs: number[] = [];

                        prismaBook.bookshelves.forEach(bookshelf => {
                            savedBookshelfIDs.push(bookshelf.id);
                        })

                        book.savedBookshelfIDs = savedBookshelfIDs;
                    }

                    books.push(book);
                })
                console.log(books);
            }
            else {

                // find users with name that contains string
                const prismaUsers = await prismaClient.user.findMany({
                    where: {
                        name: {
                            contains: searchString
                        }
                    },
                    select:{
                        id: true,
                        name: true,
                        profilePic: true
                    }
                })

                users = prismaUsers.map((prismaUser) => {
                    const user: Client = {
                        id: prismaUser.id,
                        name: prismaUser.name,
                        profilePic: prismaUser.profilePic ? process.env.PROFILE_PHOTOS_URL + prismaUser.id : 'default'
                    }
                    return user
                })
            }
            
            return {
                searchType,
                searchString,
                books,
                bookshelves,
                users
            }
        }

	} catch (err) {
		console.log(err);
	}
}