import type { RequestEvent } from '@sveltejs/kit';
import type { Collection } from '../../../../../../types/book.type';
import { prismaClient } from '../../../../../../lib/lucia';
import { getBookInfoFromGoogleBooksAPI } from '$lib/functions';
import { readJSONToBook } from '../../../../../../scripts';

export async function GET({ params }: RequestEvent) {
	const userId = params.userId || '';

	if (userId == '') {
		return new Response('User not specified/ incorrectly mapped.');
	}

	let collections: Collection[] = [];
	const prismaCollections = await prismaClient.prismaCollection.findMany({
		where: { userId: userId},
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
				select: {notes: true}
			},
			bookId: true
		}
	});
	console.log(prismaCollections)

	for await (const prismaCollection of prismaCollections) {
		const googleResponse: any = await getBookInfoFromGoogleBooksAPI(prismaCollection.bookId);

		const imgURL = readJSONToBook(googleResponse).imageURL;
		

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
			},
			numNotes: prismaCollection._count.notes,
			bookId: prismaCollection.bookId,
			imgURL: imgURL
		};

		//console.log(collection);

		
		collections.push(collection);
	};


	// if (collections.length == 0) {
	// 	return new Response(`404 There are no existing collections for ${userId} in database`);
	// }
	return new Response(JSON.stringify(collections));
}
