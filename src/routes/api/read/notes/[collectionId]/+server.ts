import type { RequestEvent } from '@sveltejs/kit';
import type { Note } from 'src/types/book.type';
import { prismaClient } from '../../../../../lib/lucia';

export async function GET({ params }: RequestEvent) {
	const collectionId: number = params.collectionId == null ? -1 : parseInt(params.collectionId);

	if (collectionId == -1) {
		return new Response('Collection not specified/ incorrectly mapped.');
	}

	const prismaNotes = await prismaClient.prismaNote.findMany({
		where: { collectionId: collectionId }
	});
	let notes: Note[] = [];
	prismaNotes.forEach((prismaNote) => {
		const note: Note = {
			id: prismaNote.id,
			title: prismaNote.title,
			content: prismaNote.content,
			creationDate: prismaNote.creationDate,
			pageNum: prismaNote.pageNum
		};
		notes.push(note);
	});

	if (notes.length == 0) {
		return new Response(
			`404 There are no existing notes for collection ${collectionId} in database`
		);
	}
	return new Response(JSON.stringify(notes));
}
