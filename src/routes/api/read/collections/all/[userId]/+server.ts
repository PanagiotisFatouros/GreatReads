import type { RequestEvent } from '@sveltejs/kit';
import type { Collection } from '../../../../../../types/book.type';
import { prismaClient } from '../../../../../../lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../../../../../../lib/scripts';

export async function GET({ params }: RequestEvent) {
	const userId = params.userId || '';

	if (userId == '') {
		return new Response('User not specified/ incorrectly mapped.');
	}

	const prismaCollections = await prismaClient.prismaCollection.findMany({
		where: { userId: userId },
		select: {
			id: true,
			title: true,
			creationDate: true,
			isPublic: true,
			upvotes: true,
			user: {
				select: {
					id: true,
					name: true,
					profilePic: true
				}
			},
			_count: {
				select: { notes: true }
			},
			notes: {
				take: 1,
				orderBy: {
					creationDate: 'desc'
				},
				select: { creationDate: true }
			},
			bookId: true
		}
	});

	const bookProms: any = [];

	prismaCollections.forEach((prismaCollection) => {
		bookProms.push(getBookInfoFromGoogleBooksAPI(prismaCollection.bookId));
	});

	const bookRes = await Promise.all(bookProms);

	let collections: Collection[] = [];

	bookRes.forEach((book, i) => {
		const prismaCollection = prismaCollections[i];

		const imgURL = readJSONToBook(book).imageURL;
		const prismaUser = prismaCollection.user;

		const collection: Collection = {
			id: prismaCollection.id,
			title: prismaCollection.title,
			creationDate: prismaCollection.creationDate,
			isPublic: prismaCollection.isPublic,
			upvotes: prismaCollection.upvotes,
			user: {
				id: prismaCollection.user.id,
				name: prismaCollection.user.name,
				profilePic: prismaUser.profilePic
					? process.env.PROFILE_PHOTOS_URL + prismaUser.id
					: 'default'
			},
			numNotes: prismaCollection._count.notes,
			bookId: prismaCollection.bookId,
			imgURL: imgURL
		};
		if (prismaCollection.notes.length > 0) {
			collection.lastUpdateDate = prismaCollection.notes[0].creationDate;
		}

		collections.push(collection);
	});
	collections.sort((a: Collection, b: Collection) => {
		const aDate: Date = a.lastUpdateDate ? a.lastUpdateDate : a.creationDate;
		const bDate: Date = b.lastUpdateDate ? b.lastUpdateDate : b.creationDate;

		return aDate > bDate ? -1 : 1;
	});

	// if (collections.length == 0) {
	// 	return new Response(`404 There are no existing collections for ${userId} in database`);
	// }
	return new Response(JSON.stringify(collections));
}
