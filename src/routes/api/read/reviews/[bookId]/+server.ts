import type { RequestEvent } from '@sveltejs/kit';
// import { getAllRows, mysqlconn } from '../../../../../../database/mysql';
import { prismaClient } from '../../../../../lib/lucia';

export async function GET({ params }: RequestEvent) {

	const bookId = params.bookId || ""


	if (bookId == ""){
		return new Response("Book not specified/ incorrectly mapped.")
	}
	// if (userId == ""){
	// 	return new Response("User not specified/ incorrectly mapped.")
	// }

	let reviews = await prismaClient.review.findMany({
		where: {bookId: bookId}
	})


	if (reviews.length == 0) {
		return new Response(`404 There are no existing reviews for ${bookId} in database`);
	}
	return new Response(JSON.stringify(reviews));
}
