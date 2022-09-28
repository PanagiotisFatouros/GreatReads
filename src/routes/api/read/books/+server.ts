import { prismaClient } from "../../../../lib/lucia";

export async function GET() {
	
	const allBooksInDatabase = await prismaClient.prismaBook.findMany()


	if (allBooksInDatabase.length == 0) {
		return new Response('404 There are no Google Books in database');
	}
	return new Response(JSON.stringify(allBooksInDatabase));
}
