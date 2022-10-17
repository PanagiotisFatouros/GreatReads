import type { Book } from "./types/book.type";
import { searchTypes } from "./types/searchTypes.enum.js";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
const missingImage = "https://www.lostbookproductions.com/wp-content/uploads/2019/01/logo-lost-book-lg.png"
const BOOK_IMG_URL_PREFIX = "https://books.google.com/books/publisher/content/images/frontcover/"
const BOOK_IMG_URL_SUFFIX = "?fife=w800-h1200&source=gbs_api"


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
	// console.log(jsonOject)
	let book: Book = {
		id: jsonOject.id,
		title: jsonOject.volumeInfo.title,
		authors: jsonOject.volumeInfo.authors,
		pageCount: jsonOject.volumeInfo.pageCount,
		description: jsonOject.volumeInfo.description,
		genres: jsonOject.volumeInfo.categories,
		isbn: getISBN13(jsonOject.volumeInfo.industryIdentifiers),
		avgRating: jsonOject.volumeInfo.averageRating === undefined? 0 : jsonOject.volumeInfo.averageRating,
		//avgRating: 0,
		numRatings: jsonOject.volumeInfo.ratingsCounts === undefined? 0 : jsonOject.volumeInfo.ratingsCounts, 
		//numRatings: 0,
		datePublished: jsonOject.volumeInfo.publishedDate,
		imageURL: jsonOject.volumeInfo?.imageLinks?.thumbnail ?
			(BOOK_IMG_URL_PREFIX + jsonOject.id + BOOK_IMG_URL_SUFFIX) : missingImage
		
	};
	return book;
}

function getISBN13(identifiers: any[]){
	let isbn;
	if (identifiers !== undefined){
		isbn = identifiers.find((identifier) => 
		identifier.type === "ISBN_13")?.identifier

		if (isbn === undefined ){
			isbn = identifiers[0]?.identifier

			if (isbn === undefined){
				isbn = "-"
			}
		}
	}
	return isbn
}



// For google books api search
export function getCriteria(searchType: searchTypes): string{
	switch(searchType) {
		case searchTypes.books:
			return "intitle";
		case searchTypes.authors:
			return "inauthor";
		case searchTypes.genres:
			return "subject";
		default:
			return "intitle";
	}
}