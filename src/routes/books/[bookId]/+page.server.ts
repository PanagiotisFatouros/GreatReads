import type { RequestEvent } from "@sveltejs/kit"
// import { createNewEntity } from "../../../../database/mysql"
import { auth } from "$lib/lucia";
import type { Book } from "src/types/book.type";
import { error, redirect } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */
export async function load({ request, url, params }:RequestEvent) {
  try {
    const session = await auth.validateRequestByCookie(request);
    if (session) {
        // authenticated

        const baseURL = url.origin;
        console.log(baseURL);

        const bookID = params.bookId;

        // console.log(request);
        // console.log(params);
        let book:Book = await (await fetch(`${baseURL}/api/read/books/${bookID}/${session.user.user_id}`)).json()

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
  catch {
    //not authenticated
    throw redirect(307, '/authentication')
  }
}
