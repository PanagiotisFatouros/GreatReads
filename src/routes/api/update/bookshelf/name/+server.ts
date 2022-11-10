import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	
    let { bookshelfId, name } = await request.json();

    try {
        let updatedBookshelf = await prismaClient.prismaBookshelf.update({
            where: {
                id: bookshelfId
            },
            data: {
                name: name
            }
        })
        if (updatedBookshelf) {
            return new Response (JSON.stringify(updatedBookshelf));
        }
    }
    catch(err){
      throw error(400, `Book not successfully added to bookshelf, error: ${err}`)
    }
}