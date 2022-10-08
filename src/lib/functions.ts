import { readJSONToBook } from "../scripts";

export async function getBookInfoFromGoogleBooksAPI(bookId: String) {
	const googleBooksApiURL = 'https://www.googleapis.com/books/v1/volumes/';
	const response = await (await fetch(`${googleBooksApiURL}${bookId}`)).json()
	console.log(readJSONToBook(response))
	return readJSONToBook(response);
}
