import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { PrismaCollection } from '@prisma/client';
import type { Collection } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	let { id } = await request.json();
	const collectionId = Number(id) ? parseInt(id) : -1;
	if (collectionId == -1) {
		throw error(400, 'Collection ID is not valid/specified');
	}

	let updatedPrismaCollection: PrismaCollection;
	let returnedCollection: Collection;
	try {
		const existingPrismaCollection = await prismaClient.prismaCollection.findUnique({
			where: {
				id: collectionId
			},
			include: {
				user: true
			}
		});

		if (existingPrismaCollection != null) {
			if (!existingPrismaCollection.isPublic) {
				throw error(400, 'Attempting to upvote private collection');
			}
			updatedPrismaCollection = await prismaClient.prismaCollection.update({
				where: {
					id: collectionId
				},
				data: {
					upvotes: existingPrismaCollection.upvotes + 1
				}
			});

			returnedCollection = {
				id: collectionId,
				title: updatedPrismaCollection.title,
				creationDate: updatedPrismaCollection.creationDate,
				isPublic: updatedPrismaCollection.isPublic,
				upvotes: updatedPrismaCollection.upvotes,
				user: {
					id: existingPrismaCollection.user.id,
					name: existingPrismaCollection.user.name,
					profilePic: existingPrismaCollection.user.profilePic
						? process.env.PROFILE_PHOTOS_URL + existingPrismaCollection.user.id
						: 'default'
				}
			};
			return new Response(JSON.stringify(returnedCollection));
		} else {
			throw error(404, "Can't find target collection in database");
		}
	} catch (err) {
		throw error(400, `Collection not succesfully upvoted, error: ${err}`);
	}
}
