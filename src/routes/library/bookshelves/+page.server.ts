import type { ServerLoadEvent } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import { redirect } from '@sveltejs/kit';
import type { Bookshelf } from '../../../types/book.type';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url }: ServerLoadEvent) {
	try {
		
		const session = await auth.validateRequestByCookie(request);
		if (session) {
			//console.log(session.access_token)
			
            const host = url.host;
            let bookshelves: Bookshelf[] = await (await fetch(`http://${host}/api/read/bookshelves/${session.user.user_id}/-1`)).json()


            return {
                bookshelves: bookshelves
            }
            

		} else {
			//not authenticated
			throw redirect(307, '/authentication/login');
		}
	} catch (err) {
		console.log(err);
		//not authenticated
		throw redirect(307, '/authentication/login');
	}
}