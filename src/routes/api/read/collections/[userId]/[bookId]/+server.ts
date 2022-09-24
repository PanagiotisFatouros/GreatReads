import type { RequestEvent } from '@sveltejs/kit';
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

	let collections = await prismaClient.collection.findMany({
		where: {userId: userId, bookId: bookId}
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
