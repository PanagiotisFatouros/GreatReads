import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { auth, prismaClient } from '$lib/lucia';
import type { Client } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	
    let { favAuthor, favGenre, bio, userId } = await request.json()
    if (userId == undefined){
        throw error(400, 'User ID not specified')
    }

    try {
        
        //may be empty strings
        await auth.updateUserData(userId, {
            favAuthor: favAuthor,
            favGenre: favGenre,
            bio: bio
        })
        
        return new Response("User Profile details successfully updated!")
    }
    catch(err){
      throw error(400, `User Profile Details not succesfully updated, error: ${err}`)
    }
}
