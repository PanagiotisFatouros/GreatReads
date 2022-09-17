import { mysqlconn } from '../../../../database/mysql';


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

/** @type {import('./$types').RequestHandler} */
export async function GET(request){
    let googleBooksId = null;
    let queryString = "select * from book;"
    let sqlRows;
    let results = await mysqlconn.query(queryString)
        .then(function([rows,fields]) {
            console.log(rows);
            sqlRows = rows;
            return rows;
        });
    return new Response(JSON.stringify(sqlRows));
}