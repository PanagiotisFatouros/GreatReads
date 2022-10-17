// import { createNewEntity } from '../../../../../database/mysql';
import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { PrismaCollection, Prisma, User } from '@prisma/client';
import type { Collection } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }: RequestEvent) {
	const bookId = params.bookId || '';
	const { title, userId, isPublic } = await request.json();
	let createdPrismaCollection: PrismaCollection;
	let createdCollection: Collection

	try {

		const newCollectionInput: Prisma.PrismaCollectionCreateInput = {
			title: title,
			creationDate: new Date(),
			isPublic: isPublic,
			upvotes: 0,
			book: { connect: { googleBooksId: bookId } },
			user: { connect: { id: userId } }
		};
		createdPrismaCollection = await prismaClient.prismaCollection.create({ data: newCollectionInput });

		const user: User | null = await prismaClient.user.findUnique({
			where: {
				id: createdPrismaCollection.userId
			}
		})
		if (user != null) {
			createdCollection = {
				id: createdPrismaCollection.id,
				title: createdPrismaCollection.title,
				creationDate: createdPrismaCollection.creationDate,
				isPublic: createdPrismaCollection.isPublic,
				upvotes: createdPrismaCollection.upvotes,
				user: {
					id: user.id,
					name: user.name,
					profilePic: user.profilePic ? process.env.PROFILE_PHOTOS_URL + user.id : "default"
				}
			}
			return new Response(JSON.stringify(createdCollection));
		}
	} catch (err) {
		console.log(err);
		throw error(404, `Collection not successfully created, error: ${err}`);
	}
}
