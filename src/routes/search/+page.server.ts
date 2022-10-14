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
                const response = await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=?${searchCriteria}`)).json()
                const googleBooks = readGoogleBooksResponse(response)

                bookshelves = await (
                    await fetch(`http://${host}/api/read/bookshelves/${session.user.user_id}/names`)
                ).json();

                
                // get ratings from database 
                for await (const googleBook of googleBooks) {
                    const ratingResponse = await (await fetch(`http://${host}/api/read/books/${googleBook.id}/rating`)).json()
                    googleBook.avgRating = ratingResponse.avgRating
                    googleBook.numRatings = ratingResponse.numRatings
                    
                    if (session) {
                        let existingBookInDatabase = await prismaClient.prismaBook.findUnique({
                            where: { googleBooksId: googleBook.id },
                            include: {
                                bookshelves: {
                                    where: {userId: session.user.user_id},
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        });

                        if (existingBookInDatabase != null) {
                            let savedBookshelfIDs: number[] = [];

                            existingBookInDatabase.bookshelves.forEach(bookshelf => {
                                savedBookshelfIDs.push(bookshelf.id);
                            })

                            googleBook.savedBookshelfIDs = savedBookshelfIDs;
                        }
                    }

                    books.push(googleBook);
                    
                }
                // console.log(googleBooks[0])
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
                        profilePic: prismaUser.profilePic || ''
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