// import { createNewEntity } from '../../../../../database/mysql';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '../../../../../lib/lucia';
import type { PrismaCollection, Prisma } from '@prisma/client';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }: RequestEvent) {
	const bookId = params.bookId || '';
	const { title, userId, isPublic } = await request.json();
	let createdCollection: PrismaCollection;

	try {
		// Create user profile, which has username as the user's name in database
		// createdCollectionId = await createCollection(userId, bookId, title)
		// console.log(createdCollectionId)
		const newCollectionInput: Prisma.PrismaCollectionCreateInput = {
			title: title,
			creationDate: new Date(),
			isPublic: isPublic,
			upvotes: 0,
			book: { connect: { googleBooksId: bookId } },
			user: { connect: { id: userId } }
		};
		createdCollection = await prismaClient.prismaCollection.create({ data: newCollectionInput });
	} catch (err) {
		console.log(err);
		return new Response('Collection not successfully created');
	}
	return new Response(JSON.stringify(createdCollection));
}
