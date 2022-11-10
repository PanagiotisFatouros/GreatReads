import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Bookshelf, Book } from 'src/types/book.type';
import { prismaClient } from '$lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { auth } from '$lib/lucia';

export async function GET({ request, params }: RequestEvent) {
	try {
		//console.log(request)

		//const session = await auth.validateRequest(request);
		//console.log(session)
		const userId = params.userId || '';

		const prismaBookshelves = await prismaClient.prismaBookshelf.findMany({
			where: { userId: userId },
			select: {
				id: true,
				name: true,
				isDeletable: true,
				creationDate: true
			}
		});

		if (prismaBookshelves == null) {
			throw error(400, `Bookshelves not found!`);
		} else {
			let bookshelves: Bookshelf[] = [];
			for (const prismaBookshelf of prismaBookshelves) {
				const bookshelf: Bookshelf = {
					id: prismaBookshelf.id,
					name: prismaBookshelf.name,
					isDeletable: prismaBookshelf.isDeletable,
					creationDate: prismaBookshelf.creationDate
				};

				bookshelves.push(bookshelf);
			}

			return new Response(JSON.stringify(bookshelves));
		}
	} catch (err) {
		throw error(400, `Bookshelves not successfully retrevied, error: ${err}`);
	}
}
