import type { ServerLoadEvent } from '@sveltejs/kit';
import { searchTypes } from '../../types/searchTypes.enum';
import type { Book, Client } from '../../types/book.type'

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url }: ServerLoadEvent) {
	//TODO: remove
    let book: Book = {
		id: 'zyTCAlFPjgYC',
		title: 'The Hunger Games',
		authors: ['Suzanne Collins'],
		pageCount: 384,
		avgRating: 4.3,
		numRatings: 35,
		description:
			'The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the perspective of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.',
		reviews: [],
		genres: ['Dystopian', 'science fiction', 'drama', 'action'],
		isbn: '9780440335702',
		datePublished: '1st December 2011',
		imageURL:
			'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api',
		userNotes: [],
		publicNotes: []
	};
	let books = [book, book, book, book, book, book, book];

    let user1: Client = {
        id: '123',
        profilePic:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU',
		name: 'Dean Coleman'
    };
    let users = [user1, user1, user1, user1, user1, user1, user1];

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