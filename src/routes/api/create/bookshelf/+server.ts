import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import type { Prisma, PrismaBookshelf } from '@prisma/client';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
	
    const { name, isDeletable, userId } = await request.json()
    let createdBookshelf: PrismaBookshelf 
    try {
        const newBookshelfInput: Prisma.PrismaBookshelfCreateInput = {
          name: name,
          isDeletable: isDeletable,
          creationDate: new Date(),
          user: {connect:{id: userId}}
        }

        createdBookshelf = await prismaClient.prismaBookshelf.create({data: newBookshelfInput})
      }
    catch(err){
      console.log(err)
      return new Response(`Deletable bookshelf not successfully created, error: ${err}`)
    }
    return new Response(`Bookshelf successfully created. Created Bookshelf: ${JSON.stringify(createdBookshelf)}`);
}
