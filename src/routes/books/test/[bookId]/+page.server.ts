import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }: RequestEvent) {
	return {
		bookId: params.bookId
	};
}
