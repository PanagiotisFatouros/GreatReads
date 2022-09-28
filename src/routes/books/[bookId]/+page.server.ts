import type { ServerLoadEvent } from "@sveltejs/kit"
// import { createNewEntity } from "../../../../database/mysql"
import { auth } from "$lib/lucia";
import type { Book } from "src/types/book.type";
import { error, redirect } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
export async function load ({ request, url, params }:ServerLoadEvent) {
  try {
    const session = await auth.validateRequestByCookie(request);
    if (session) {
        // authenticated

        const host = url.host;
        // console.log(baseURL);
        // console.log(url);

        const bookID = params.bookId;

        // console.log(request);
        // console.log(params);
        let book:Book = await (await fetch(`http://${host}/api/read/books/${bookID}/${session.user.user_id}`)).json()

        console.log(book)

        return {
          book: book
        }
    }
    else {
      //not authenticated
      throw redirect(307, '/authentication')
    }
  }
  catch (err) {
    console.log(err);
    //not authenticated
    throw redirect(307, '/authentication')
  }
}
