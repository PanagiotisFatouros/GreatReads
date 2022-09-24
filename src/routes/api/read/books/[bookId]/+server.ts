import type { RequestEvent } from '@sveltejs/kit'
import type { Book, Review,  } from 'src/types/book.type'
import type { Prisma } from '@prisma/client'
import { prismaClient } from '../../../../../lib/lucia'


export async function GET({ params }: RequestEvent) {
	const googleBooksId = params.bookId || ""

	// Checks to see if existing book is in database, 
	

	let targetGoogleBook: Book
	const restBookInfo: any = await getBookInfo(googleBooksId)
	// console.log(restBookInfo)

	if (restBookInfo.error){

		return new Response("404 Google Book Does not Exist")
		
	}
	else {

		// Check if book already in database 
		let bookInDatabase = await prismaClient.book.findUnique({
			where: {
				googleBooksId: googleBooksId
			}
		})
	
		console.log(bookInDatabase)
		// if yes: proceed normally,
		// else: create new entry for book then proceed
		if (bookInDatabase == null){
			let newBookInput: Prisma.BookCreateInput = {
				googleBooksId: googleBooksId
			}
			bookInDatabase = await prismaClient.book.create({data: newBookInput})
		}

		// creating google book object
		targetGoogleBook = {
			id: googleBooksId,
			title: restBookInfo.volumeInfo.title,
			authors: restBookInfo.volumeInfo.authors,
			pageCount: restBookInfo.volumeInfo.pageCount,
			description: restBookInfo.volumeInfo.description,
			genres: restBookInfo.volumeInfo.categories,
			isbn: restBookInfo.volumeInfo.industryIdentifiers[1],
			datePublished: restBookInfo.volumeInfo.publishedDate,
			imageURL: restBookInfo.volumeInfo.imageLinks.thumbnail,
		
			// hardcoded fields in api
			avgRating: 6,
			numRatings: 6,
			reviews: [],
			userNotes: [],
			publicNotes: [],
		}
		return new Response(JSON.stringify(targetGoogleBook));
	}
}


async function getBookInfo(bookId: String){
    const googleBooksApiURL = "https://www.googleapis.com/books/v1/volumes/"
    let bookData;
    await fetch(`${googleBooksApiURL}${bookId}`)
    .then((response) => {
		return response.json()
	}
	)
    .then((data) => {
        bookData = data
        return bookData
    })
    return bookData
}
