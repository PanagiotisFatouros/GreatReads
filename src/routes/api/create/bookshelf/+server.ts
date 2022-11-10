import type { RequestEvent } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { Prisma, PrismaBookshelf, User } from '@prisma/client';
import type { Bookshelf } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
	const { name, userId } = await request.json();

	let createdPrismaBookshelf: PrismaBookshelf;
	let createdBookshelf: Bookshelf;

	try {
		const newBookshelfInput: Prisma.PrismaBookshelfCreateInput = {
			name: name,
			isDeletable: true,
			creationDate: new Date(),
			user: { connect: { id: userId } }
		};
		createdPrismaBookshelf = await prismaClient.prismaBookshelf.create({ data: newBookshelfInput });

		const user: User | null = await prismaClient.user.findUnique({
			where: {
				id: createdPrismaBookshelf.userId
			}
		});

		if (user != null) {
			createdBookshelf = {
				id: createdPrismaBookshelf.id,
				name: createdPrismaBookshelf.name,
				isDeletable: createdPrismaBookshelf.isDeletable,
				creationDate: createdPrismaBookshelf.creationDate,
				user: {
					id: user.id,
					name: user.name,
					profilePic: process.env.PROFILE_PHOTOS_URL + user.id
				},
				books: []
			};
			return new Response(JSON.stringify(createdBookshelf));
		} else {
			throw error(400, `User ${userId} does not exist`);
		}
	} catch (err) {
		console.log(err);
		throw error(400, `Bookshelf not successfully created, error: ${err}`);
	}
}
