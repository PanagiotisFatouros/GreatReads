//TODO: update to match actual type in database
export type Book = {
    title: string,
    authors: string[],
    pageCount: number,
    //will be computed from stored ratings not saved with book
    avgRating: number,
    numRatings: number,
    description: string,
    //will be array of Review types not strings
    reviews: string[],
    genres: string[],
    isbn: string,
    //could be Date
    datePublished: string,
    imageURL: string,
    //TODO: maybe add language
}