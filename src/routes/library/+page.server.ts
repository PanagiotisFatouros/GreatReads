import type { ServerLoadEvent } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import { redirect } from '@sveltejs/kit';
import type { Bookshelf, Collection } from '../../types/book.type';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url }: ServerLoadEvent) {
	try {
		
		const session = await auth.validateRequestByCookie(request);
		if (session) {
			//console.log(session.access_token)
			
            const host = url.host;

            //get 4 bookshelves
            //TODO: determine which 4
            let bookshelves: Bookshelf[] = await (await fetch(`http://${host}/api/read/bookshelves/${session.user.user_id}/4`)).json()

            let collections: Collection[] = await (await fetch(`http://${host}/api/read/collections/all/${session.user.user_id}`)).json()

            return {
                bookshelves: bookshelves,
                collections: collections
            }
            

		} else {
			//not authenticated
			throw redirect(307, '/authentication');
		}
	} catch (err) {
		console.log(err);
		//not authenticated
		//throw redirect(307, '/authentication');
	}
}