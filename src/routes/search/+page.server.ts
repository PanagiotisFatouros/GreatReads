import type { ServerLoadEvent } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url }: ServerLoadEvent) {
	try {
		
        console.log(url);

        return {
            books: [],
            users: []
        }

	} catch (err) {
		console.log(err);
	}
}