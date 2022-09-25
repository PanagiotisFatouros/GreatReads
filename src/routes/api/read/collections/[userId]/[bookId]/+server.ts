import type { RequestEvent } from '@sveltejs/kit';
import type { Collection } from '../../../../../../types/book.type';
// import { getAllRows, mysqlconn } from '../../../../../../database/mysql';
import { prismaClient } from '../../../../../../lib/lucia';

export async function GET({ params }: RequestEvent) {
	// const table = 'collection';
	// const conditions = ['BookId', 'UserId'];
	// const values = [JSON.stringify(params.bookId), JSON.stringify(params.userId)];
	const bookId = params.bookId || ""
	const userId = params.userId || ""

	if (bookId == ""){
		return new Response("Book not specified/ incorrectly mapped.")
	}
	if (userId == ""){
		return new Response("User not specified/ incorrectly mapped.")
	}

	let collections: Collection[] = []
	const prismaCollections = await prismaClient.prismaCollection.findMany({
		where: {userId: userId, bookId: bookId},
		select:{
			id: true,
			title: true,
			creationDate: true,
			isPublic: true,
			upvotes: true,
			user:{
				select:{
					id: true,
					name: true,
					profilePic: true
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
	

	// // console.log(conditions, values)
	// let targetCollections;
	// await getAllRows(table, conditions, values).then(
	// 	(returnedCollections) => (targetCollections = returnedCollections)
	// );

	if (collections.length == 0) {
		return new Response(`404 There are no existing collections for ${userId} in database`);
	}
	return new Response(JSON.stringify(collections));
}
