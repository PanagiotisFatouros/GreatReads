import { mysqlconn } from '../../../../../database/mysql';


// export async function get( request ) {
//     let googleBooksId = null;
//     let queryString = "select * from book;"
//     let results = await mysqlconn.query(queryString)
//         .then(function([rows,fields]) {
//             console.log(rows);
//             return rows;
//         });
        
    
//     return {
//         status: 200,
//         body: {hello: 'world'}
//     }
// }

/** @type {import('../../../../../../.svelte-kit/types/src/routes/api/read/book/[bookId]/$types').RequestHandler} */
export async function GET({params}){
    let googleBooksId = params.bookId;
    let queryString = "select * from book where GoogleBooksID = '" + googleBooksId + "';"
    let targetBook;
    let results = await mysqlconn.query(queryString)
        .then(function([rows,fields]) {
            console.log(rows);
            let rowArray = JSON.parse(JSON.stringify(rows));
            targetBook = rowArray.length == 0 ? null : rowArray[0];
            return rows;
        }).catch((err) => console.log(err));

    if (targetBook == null){
        return new Response("404 Book Not Found");
    }
    return new Response(JSON.stringify(targetBook));
}