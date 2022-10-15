import type { RequestEvent } from '@sveltejs/kit';
import type { Collection, Note } from 'src/types/book.type';
import { prismaClient } from '../../../../../lib/lucia';

export async function GET({ params }: RequestEvent) {
	const collectionId: number = params.collectionId == null ? -1 : parseInt(params.collectionId);

	if (collectionId == -1) {
		return new Response('Collection not specified/ incorrectly mapped.');
	}
	// if (userId == ""){
	// 	return new Response("User not specified/ incorrectly mapped.")
	// }

	const prismaCollection = await prismaClient.prismaCollection.findUnique({
		where: { id: collectionId },
		select: {
			title: true,
			creationDate: true,
			isPublic: true,
			upvotes: true,
			user: {
				select: {
					id: true,
					name: true,
					profilePic: True
				}
			},
			notes: true
		}
	});
	// console.log(prismaCollection);

	if (prismaCollection == null) {
		return new Response(`Collection with id ${collectionId} does not exist.`);
	} else {
		let notes: Note[] = [];
		prismaCollection.notes.forEach((prismaNote) => {
			const note: Note = {
				id: prismaNote.id,
				title: prismaNote.title,
				content: prismaNote.content,
				creationDate: prismaNote.creationDate,
				pageNum: prismaNote.pageNum
			};
			notes.push(note);
		});
		// console.log(notes);

		let collection: Collection = {
			id: collectionId,
			title: prismaCollection.title,
			creationDate: prismaCollection.creationDate,
			isPublic: prismaCollection.isPublic,
			upvotes: prismaCollection.upvotes,
			user: {
				id: prismaCollection.user.id,
				name: prismaCollection.user.name,
				profilePic:prismaCollection.user.profilePic ? process.env.PROFILE_PHOTOS_URL + prismaCollection.user.id : 'default',
			},
			notes: notes
		};
		// console.log(collection);

		// if (notes.length == 0) {
		// 	return new Response(`404 There are no existing notes for collection ${collectionId} in database`);
		// }

		return new Response(JSON.stringify(collection));
	}
}
