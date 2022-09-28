// import { createNewEntity } from '../../../../../database/mysql'
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '../../../../../lib/lucia';
import type { PrismaNote, Prisma } from '@prisma/client';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }: RequestEvent) {
	const collectionId = params.collectionId ? parseInt(params.collectionId) : -1;
	if (collectionId == -1) {
		console.log('collection id has value', collectionId, 'and is invalid');
	}
	const { title, content, pageNum } = await request.json();

	let createdNote: PrismaNote;

	try {
		const newNoteInput: Prisma.PrismaNoteCreateInput = {
			title: title,
			content: content,
			collection: { connect: { id: collectionId } },
			pageNum: pageNum,
			creationDate: new Date()
		};

		createdNote = await prismaClient.prismaNote.create({ data: newNoteInput });
	} catch (err) {
		console.log(err);
		return new Response('Note not successfully created');
	}
	return new Response(`Note successfully created! New Note has ID ${JSON.stringify(createdNote)}`);
}

// async function createNote(title: String, content: String, collectionId: String){
//     const table = "note"
//     const collectionFields = "(Title, Content, CreationDate, CollectionId)"
//     const creationDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
//     const collectionValues = `('${title}', '${content}', '${creationDate}', '${collectionId}')`
//     const idCreatedCollection = await createNewEntity(table, collectionFields, collectionValues)
//     console.log(idCreatedCollection)
//     return idCreatedCollection
//   }
