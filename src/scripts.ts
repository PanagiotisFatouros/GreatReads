import type { Book } from "./types/book.type";
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
const missingImage = "https://www.lostbookproductions.com/wp-content/uploads/2019/01/logo-lost-book-lg.png"

export function getTimeAgo(date: Date) {
	if (typeof date === 'string') {
		date = new Date(date);
	}

	const secondsAgo = Math.round((Date.now() - Number(date)) / 1000);

	if (secondsAgo < MINUTE) {
		return secondsAgo + ` second${secondsAgo !== 1 ? 's' : ''} ago`;
	}

	let divisor;
	let unit = '';

	if (secondsAgo < HOUR) {
		[divisor, unit] = [MINUTE, 'minute'];
	} else if (secondsAgo < DAY) {
		[divisor, unit] = [HOUR, 'hour'];
	} else if (secondsAgo < WEEK) {
		[divisor, unit] = [DAY, 'day'];
	} else if (secondsAgo < MONTH) {
		[divisor, unit] = [WEEK, 'week'];
	} else if (secondsAgo < YEAR) {
		[divisor, unit] = [MONTH, 'month'];
	} else {
		[divisor, unit] = [YEAR, 'year'];
	}

	const count = Math.floor(secondsAgo / divisor);

	return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
}

export function readGoogleBooksResponse(jsonOject: any): Book[] {
	return jsonOject.items.map(readJSONToBook);
}

export function readJSONToBook(jsonOject: any): Book {
	let book: Book = {
		id: jsonOject.id,
		title: jsonOject.volumeInfo.title,
		authors: jsonOject.volumeInfo.authors,
		pageCount: jsonOject.volumeInfo.pageCount,
		description: jsonOject.volumeInfo.description,
		genres: jsonOject.volumeInfo.categories,
		isbn: jsonOject.volumeInfo.industryIdentifiers[0].identifier,
		datePublished: jsonOject.volumeInfo.publishedDate,
		imageURL: jsonOject.volumeInfo?.imageLinks?.thumbnail ?
			jsonOject.volumeInfo?.imageLinks?.thumbnail : missingImage
	};
	return book;
}