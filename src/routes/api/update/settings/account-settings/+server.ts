import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import type { Client } from 'src/types/book.type';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }: RequestEvent) {
	
    let {password, name, userId} = await request.json()
    if (userId == undefined){
        throw error(400, 'User ID not specified')
    }

    try {

        // Update user password
        if (password){
            await auth.resetUserPassword(userId, password)
            console.log(`password successfully updated, user name: ${name}}`)
        }

        if (name){
            await auth.updateUserData(userId, {name: name});
        }
        return new Response("account setting successfully updated")
    }
    catch(err){
      throw error(400, `User not succesfully updated, error: ${err}`)
    }
}
