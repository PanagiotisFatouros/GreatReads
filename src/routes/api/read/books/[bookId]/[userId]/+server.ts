import type { RequestEvent } from '@sveltejs/kit'
import type { Book, Collection, Review  } from 'src/types/book.type'
import type { Prisma } from '@prisma/client'
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
		let existingBookInDatabase = await prismaClient.prismaBook.findUnique({
			where: { googleBooksId: googleBooksId },
	
		}) 
	
		console.log(existingBookInDatabase)
		// if yes: proceed normally,
		// else: create new entry for book then proceed
		let reviews: Review[] = []
		let collections: Collection[] = []
		let avgRating: number
		let numRating: number
		if (existingBookInDatabase == null) {
			let newBookInput: Prisma.PrismaBookCreateInput = {
				googleBooksId: googleBooksId
			}
			await prismaClient.prismaBook.create({data: newBookInput})
			avgRating = restBookInfo.volumeInfo.averageRating == null ? 0 : Number(restBookInfo.volumeInfo.averageRating)
			numRating = restBookInfo.volumeInfo.ratingsCount == null ? 0 : Number(restBookInfo.volumeInfo.ratingsCount)
		}
		else {

			// building reviews
			const prismaReviews = await prismaClient.prismaReview.findMany({
				where: { bookId: googleBooksId },
				orderBy: {upvotes: "desc"},
				include: {user: {
					select: {
						id: true,
						name: true,
						profilePic: true
					}
				}}
			})

			if (prismaReviews.length == 0){
				avgRating = restBookInfo.volumeInfo.averageRating == null ? 0 : Number(restBookInfo.volumeInfo.averageRating)
				numRating = restBookInfo.volumeInfo.ratingsCount == null ? 0 : Number(restBookInfo.volumeInfo.ratingsCount)
			}
			else {
				avgRating = 0
				prismaReviews.forEach((prismaReview) => {

					const review: Review = {
						id: prismaReview.id,
						title: prismaReview.title,
						comment: prismaReview.comment,
						rating: prismaReview.rating,
						date: prismaReview.creationDate,
						upvotes: prismaReview.upvotes,
						isEdited: prismaReview.isEdited,
						user: {
							id: prismaReview.user.id,
							name: prismaReview.user.name,
							profilePic: prismaReview.user.profilePic
						}
					}
					avgRating += review.rating
					reviews.push(review)
				})
				
				numRating = reviews.length
				avgRating /= numRating
			}
			

			// building collections
			const prismaCollections = await prismaClient.prismaCollection.findMany({
				where: {userId: userId, bookId: googleBooksId},
				select:{
					id: true,
					title: true,
					creationDate: true,
					isPublic: true,
					upvotes: true,
					user: {
						select: {
							id: true,
							name: true,
							profilePic: true,
						}
					}
				}
			})
			prismaCollections.forEach((prismaCollection) => {
				const collection: Collection = {
					id: prismaCollection.id,
					title: prismaCollection.title,
					creationDate: prismaCollection.creationDate,
					isPublic: prismaCollection.isPublic,
					upvotes: prismaCollection.upvotes,
					user: {
						id: prismaCollection.user.id,
						name: prismaCollection.user.name,
						profilePic: prismaCollection.user.profilePic
					}
				}
				collections.push(collection)
			})

			
		}

		// creating google book object
		targetGoogleBook = {
			id: googleBooksId,
			title: restBookInfo.volumeInfo.title,
			authors: restBookInfo.volumeInfo.authors,
			pageCount: restBookInfo.volumeInfo.pageCount,
			description: restBookInfo.volumeInfo.description,
			genres: restBookInfo.volumeInfo.categories,
			isbn: restBookInfo.volumeInfo.industryIdentifiers[1].identifier,
			datePublished: restBookInfo.volumeInfo.publishedDate,
			imageURL: restBookInfo.volumeInfo.imageLinks.thumbnail,
		
			// hardcoded fields in api
			avgRating: avgRating,
			numRatings: numRating,
			reviews: reviews,
			userNotes: collections,
			publicNotes: collections.filter((collection) => collection.isPublic == true),
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
