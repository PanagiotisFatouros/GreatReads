export async function getBookInfoFromGoogleBooksAPI(bookId: String) {
	const googleBooksApiURL = 'https://www.googleapis.com/books/v1/volumes/';
	let bookData;
	await fetch(`${googleBooksApiURL}${bookId}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			bookData = data;
			return bookData;
		});
	return bookData;
}
