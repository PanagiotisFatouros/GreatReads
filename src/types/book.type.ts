//TODO: update to match actual type in database
export type Book = {
    id:number,
    title: string,
    authors: string[],
    pageCount: number,

    //will be computed from stored ratings not saved with book, I believe google api also has an avg rating that we could use if we don't have any reviews for a book
    avgRating: number,

    numRatings: number,
    description: string,
    genres: string[],
    isbn: string,
    
    //could be Date
    datePublished: string,

    imageURL: string,
    //TODO: maybe add language

    reviews: Review[],

    userNotes: Collection[],
    publicNotes: Collection[]
}

export type User = {
    name: string,
    
    //id type??
    id: number

    //link to image???
    profilePic: string,

    // all other details in user collection
}

export type Review = {
    id:number,
    title: string,
    comment: string,
    rating: number,
    date: Date,
    upvotes: number,

    // could save time by not loading entire user object - only need name, profile pic and id
    user: User
}

export type Collection = {
    id: number,
    title: string,
    creationDate: Date,
    isPublic: boolean,
    
    //only required if public collection
    upvotes: number,
    user: User,

    // could save time by not loading this until the user clicks into the collection, instead of loading every single note for every collection
    notes: Note[]
}

export type Note = {
    id:number,
    title: string,
    content: string,
    creationDate: Date,
    pageNum: number
}

