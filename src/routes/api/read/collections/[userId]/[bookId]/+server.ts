import { getAllRows, mysqlconn } from '../../../../../../database/mysql';

/** @type {import('../../../../../.svelte-kit/types/src/routes/api/read/books/$types').RequestHandler} */

export async function GET({ params }) {
	const table = 'collection';
	const conditions = ['BookId', 'UserId'];
	const values = [JSON.stringify(params.bookId), JSON.stringify(params.userId)];

	// console.log(conditions, values)
	let targetCollections;
	await getAllRows(table, conditions, values).then(
		(returnedCollections) => (targetCollections = returnedCollections)
	);

	if (targetCollections == null) {
		return new Response(`404 There are no existing collections for ${params.userId} in database`);
	}
	return new Response(JSON.stringify(targetCollections));
}
