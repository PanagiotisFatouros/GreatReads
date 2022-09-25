import type { RequestEvent } from '@sveltejs/kit'
import type { Book  } from 'src/types/book.type'
import type { Collection, Review, Prisma } from '@prisma/client'
import { prismaClient } from '../../../../../../lib/lucia'


export async function GET({ params }: RequestEvent) {
	const googleBooksId = params.bookId || ""
	const userId = params.userId || ""

	// Checks to see if existing book is in database, 
	

	let targetGoogleBook: Book
	const restBookInfo: any = await getBookInfo(googleBooksId)
	// console.log(restBookInfo)

	if (restBookInfo.error){

		return new Response("404 Google Book Does not Exist")
		
	}
	else {

		// Check if book already in database 
		let existingBookInDatabase = await prismaClient.book.findUnique({
			where: { googleBooksId: googleBooksId }
		}) 
	
		console.log(existingBookInDatabase)
		// if yes: proceed normally,
		// else: create new entry for book then proceed
		let reviews: Review[]
		let collections: Collection[]
		let avgRating: number
		let numRating: number
		if (existingBookInDatabase == null) {
			let newBookInput: Prisma.BookCreateInput = {
				googleBooksId: googleBooksId
			}
			await prismaClient.book.create({data: newBookInput})
			reviews = []
			collections = []
			avgRating = restBookInfo.volumeInfo.avgRating
			numRating = restBookInfo.volumeInfo.ratingsCount
		}
		else {
			reviews = await prismaClient.review.findMany({where: { bookId: googleBooksId }, orderBy: {upvotes: "desc"}})
			collections = await prismaClient.collection.findMany({where: {userId: userId, bookId: googleBooksId}})
			if (reviews.length == 0){
				avgRating = restBookInfo.volumeInfo.avgRating
				numRating = restBookInfo.volumeInfo.ratingsCount
			}
			else {
				avgRating = 0
				reviews.forEach((review) => {
					avgRating += review.rating
				})
				numRating = reviews.length
				avgRating /= numRating
			}
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
			avgRating: avgRating,
			numRatings: numRating,
			reviews: reviews,
			userNotes: collections,
			publicNotes: collections,
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
