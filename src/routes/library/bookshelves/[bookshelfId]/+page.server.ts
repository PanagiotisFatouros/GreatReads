import type { ServerLoadEvent } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import { redirect } from '@sveltejs/kit';
import type { Bookshelf } from '../../../../types/book.type';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url, params }: ServerLoadEvent) {
	try {
		
		const session = await auth.validateRequestByCookie(request);
		
		if (session) {
			//console.log(session.access_token)

            const bookshelfId = params.bookshelfId
			
            const host = url.host;
            let bookshelf: Bookshelf[] = await (await fetch(`http://${host}/api/read/bookshelf/${bookshelfId}`)).json()

			console.log(bookshelf)


            return {
                bookshelf: bookshelf
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