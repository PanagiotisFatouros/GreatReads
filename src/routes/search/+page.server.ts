import type { ServerLoadEvent } from '@sveltejs/kit';
import { searchTypes } from '../../types/searchTypes.enum';
import type { Book, Client } from '../../types/book.type'
import { getCriteria, readGoogleBooksResponse } from '../../scripts'
import { prismaClient } from '$lib/lucia';


/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url }: ServerLoadEvent) {
    let books: Book[] = [];

    let user1: Client = {
        id: '123',
        profilePic:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU',
		name: 'Dean Coleman'
    };
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
            //TODO: perform search
            if (searchType == searchTypes.books || searchType == searchTypes.authors || searchType == searchTypes.genres ){
                const searchCriteria = `${getCriteria(searchType)}:${searchString}`
                console.log(searchCriteria)
                const response = await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=?${searchCriteria}`)).json()
                const googleBooks = readGoogleBooksResponse(response)

                const host = url.host
                // get ratings from database 
                for await (const googleBook of googleBooks) {
                    const ratingResponse = await (await fetch(`http://${host}/api/read/books/${googleBook.id}/rating`)).json()
                    googleBook.avgRating = ratingResponse.avgRating
                    googleBook.numRatings = ratingResponse.numRatings
                    books.push(googleBook)
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
                        profilePic: prismaUser.profilePic
                    }
                    return user
                })
            }
                
            
            return {
                searchType,
                searchString,
                books,
                users
            }
        }

	} catch (err) {
		console.log(err);
	}
}