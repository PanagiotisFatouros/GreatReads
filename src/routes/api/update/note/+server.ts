import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { PrismaNote } from '@prisma/client';
import type { Note } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	
    let { id, title, content, pageNum } = await request.json()
    const noteId = Number(id) ? parseInt(id) : -1
    if (noteId == -1 ){
        throw error(400, 'Note ID is not valid/specified')
    }

    let updatedPrismaNote: PrismaNote
    let returnedNote: Note
    try {

        const existingPrismaNote = await prismaClient.prismaNote.findUnique({
            where:{
                id: noteId
            }
        })

        if (existingPrismaNote != null){
            updatedPrismaNote = await prismaClient.prismaNote.update({
                where:{
                    id: noteId
                },
                data:{
                    title: title !== undefined? title: existingPrismaNote.title,
                    content: content !== undefined? content: existingPrismaNote.content,
                    pageNum: pageNum !== undefined? pageNum: existingPrismaNote.pageNum,
                    creationDate: new Date()
                }
            })

            returnedNote = {
                id: noteId,
                content: updatedPrismaNote.content,
                title: updatedPrismaNote.title,
                creationDate: updatedPrismaNote.creationDate,
                pageNum: updatedPrismaNote.pageNum
            }
            return new Response(JSON.stringify(returnedNote))
        }
        else {
            throw error(404, "Can't find target note in database")
        }
    }
    catch(err){
      throw error(400, `Note not succesfully updated, error: ${err}`)
    }
}
