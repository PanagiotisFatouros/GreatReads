import type { RequestEvent } from '@sveltejs/kit';
// import { createNewEntity } from "../../../../database/mysql"

/** @type {import('./$types').PageLoad} */
export function load({ params }: RequestEvent) {
	return {
		bookId: params.bookId
	};
}
