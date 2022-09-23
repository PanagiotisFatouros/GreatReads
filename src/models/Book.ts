import { json } from '@sveltejs/kit';

export class Book {
	title: String;
	authors: String[];
	coverImage: String;
	ISBN: String;
	pages: Number;
	description: String;

	constructor(bookJsonString: JSON) {
		let bookJsonObject = JSON.parse(JSON.stringify(bookJsonString));
		this.title = bookJsonObject.volumeInfo.title;
		this.authors = bookJsonObject.volumeInfo.authors;
		this.coverImage = bookJsonObject.volumeInfo.imageLinks.thumbnail;
		this.ISBN = bookJsonObject.volumeInfo.industryIdentifiers[0];
		this.pages = bookJsonObject.volumeInfo.pageCount;
		this.description = bookJsonObject.volumeInfo.description;
	}
}
