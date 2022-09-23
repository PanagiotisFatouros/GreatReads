import { mysqlconn, retrieveOneEntity } from '../../../../../database/mysql';

export async function GET({ params }) {
	const table = 'book';
	const field = 'GoogleBooksID';
	const googleBooksId = params.bookId;
	let targetGoogleBook;
	await retrieveOneEntity(table, field, googleBooksId).then((googleBook) => {
		targetGoogleBook = googleBook;
	});

	console.log(targetGoogleBook);
	if (targetGoogleBook == null) {
		return new Response('404 Google Book does not exist');
	}
	return new Response(JSON.stringify(targetGoogleBook));
}
