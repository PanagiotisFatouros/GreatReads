import { mysqlconn, getAllRows } from '../../../../database/mysql';

/** @type {import('../../../../../.svelte-kit/types/src/routes/api/read/books/$types').RequestHandler} */
export async function GET(){
    const table = "book"
    let targetGoogleBooks;
    await getAllRows(table).then((returnedBooks) => targetGoogleBooks = returnedBooks)

    if (targetGoogleBooks == null){
        return new Response("404 There are no Google Books in database");
    }
    return new Response(JSON.stringify(targetGoogleBooks));
}