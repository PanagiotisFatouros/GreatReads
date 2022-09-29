// import { createNewEntity } from '../../../../../database/mysql';
import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { prismaClient } from '$lib/lucia'
import type { PrismaNote } from '@prisma/client'
 
/** @type {import('./$types').RequestHandler} */
export async function DELETE ({ params }:RequestEvent){
    const noteId: number = params.noteId? parseInt(params.noteId) : -1
    if (noteId == -1){
        throw error(400, `Note ID not specified/valid, delete note failed!`)
    }
    
    let deletedNote: PrismaNote
    try {
        
        deletedNote = await prismaClient.prismaNote.delete({
            where:{
                id: noteId
            }
        })
        
    }
    catch(err){
        throw error(400, `Note not deleted, unknown error: ${err}`)
    }
    return new Response(`Note successfully deleted! Deleted note: ${JSON.stringify(deletedNote)}`)
}
