import type { ServerLoadEvent } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import { redirect } from '@sveltejs/kit';
import { prismaClient } from '../../lib/lucia';
import type { Client } from '../../types/book.type';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }: ServerLoadEvent) {
	try {
		const session = await auth.validateRequestByCookie(request);
		if (session) {
			
            const userID = session.user.user_id;

            const prismaUser = await prismaClient.user.findUnique({
                where: {id: userID}
            })

            if (prismaUser != undefined) {
                const client:Client = {
                    name: prismaUser.name || '',
                    id: prismaUser.id || '',
                    profilePic: prismaUser.profilePic || '',
                    bio: prismaUser.bio || '',
                    favAuthor: prismaUser.favAuthor || '',
                    favGenre: prismaUser.favGenre || ''
                    //TODO: add email
                }

                return {
                    client: client
                };
            }
            

		} else {
			//not authenticated
			throw redirect(307, '/authentication');
		}
	} catch (err) {
		console.log(err);
		//not authenticated
		throw redirect(307, '/authentication');
	}
}