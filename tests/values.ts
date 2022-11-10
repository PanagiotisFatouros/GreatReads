export { googleBooksResponse, book, expectedResponse };
import type { Book } from 'src/types/book.type';

const googleBooksResponse = {
	kind: 'books#volumes',
	totalItems: 1987,
	items: [
		{
			kind: 'books#volume',
			id: 'Lx1hDQAAQBAJ',
			etag: 'qk421iDJSOo',
			selfLink: 'https://www.googleapis.com/books/v1/volumes/Lx1hDQAAQBAJ',
			volumeInfo: {
				title: 'The Mouse with the Question Mark Tail',
				authors: ['Richard Peck'],
				publisher: 'Penguin',
				publishedDate: '2014-09-11',
				description:
					"A very small mouse of unknown origins runs away from school in the Royal Mews of Buckingham Palace shortly before the celebration of Queen Victoria's diamond jubilee, celebrating her sixty years on the British throne.",
				industryIdentifiers: [
					{
						type: 'ISBN_13',
						identifier: '9780142425305'
					},
					{
						type: 'ISBN_10',
						identifier: '0142425303'
					}
				],
				readingModes: {
					text: false,
					image: false
				},
				pageCount: 256,
				printType: 'BOOK',
				categories: ['Juvenile Fiction'],
				averageRating: 3.5,
				ratingsCount: 10,
				maturityRating: 'NOT_MATURE',
				allowAnonLogging: false,
				contentVersion: '0.3.0.0.preview.0',
				panelizationSummary: {
					containsEpubBubbles: false,
					containsImageBubbles: false
				},
				imageLinks: {
					smallThumbnail:
						'http://books.google.com/books/content?id=Lx1hDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
					thumbnail:
						'http://books.google.com/books/content?id=Lx1hDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
				},
				language: 'en',
				previewLink:
					'http://books.google.com.au/books?id=Lx1hDQAAQBAJ&dq=%3F&hl=&cd=1&source=gbs_api',
				infoLink: 'http://books.google.com.au/books?id=Lx1hDQAAQBAJ&dq=%3F&hl=&source=gbs_api',
				canonicalVolumeLink:
					'https://books.google.com/books/about/The_Mouse_with_the_Question_Mark_Tail.html?hl=&id=Lx1hDQAAQBAJ'
			},
			saleInfo: {
				country: 'AU',
				saleability: 'NOT_FOR_SALE',
				isEbook: false
			},
			accessInfo: {
				country: 'AU',
				viewability: 'NO_PAGES',
				embeddable: false,
				publicDomain: false,
				textToSpeechPermission: 'ALLOWED',
				epub: {
					isAvailable: false
				},
				pdf: {
					isAvailable: false
				},
				webReaderLink:
					'http://play.google.com/books/reader?id=Lx1hDQAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
				accessViewStatus: 'NONE',
				quoteSharingAllowed: false
			},
			searchInfo: {
				textSnippet:
					'A very small mouse of unknown origins runs away from school in the Royal Mews of Buckingham Palace shortly before the celebration of Queen Victoria&#39;s diamond jubilee, celebrating her sixty years on the British throne.'
			}
		}
	]
};

let book: Book = {
	id: 'Lx1hDQAAQBAJ',
	title: 'The Mouse with the Question Mark Tail',
	authors: ['Richard Peck'],
	avgRating: 3.5,
	pageCount: 256,
	description:
		"A very small mouse of unknown origins runs away from school in the Royal Mews of Buckingham Palace shortly before the celebration of Queen Victoria's diamond jubilee, celebrating her sixty years on the British throne.",
	genres: ['Juvenile Fiction'],
	isbn: '9780142425305',
	numRatings: 0,
	datePublished: '2014-09-11',
	imageURL:
		'https://books.google.com/books/publisher/content/images/frontcover/Lx1hDQAAQBAJ?fife=w800-h1200&source=gbs_api'
};

let expectedResponse = [book];
