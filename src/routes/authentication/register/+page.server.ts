import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { auth, prismaClient } from '$lib/lucia';
import { setCookie } from 'lucia-sveltekit';
import type { Prisma, PrismaBookshelf } from '@prisma/client';

// import { createNewEntity } from "../../database/mysql";

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString() || '';
		const fullName = data.get('fullName')?.toString() || '';
		const password = data.get('password')?.toString() || '';
		console.log(email, password);

		try {
			// Create user credentials, tokens and set cookies
			const userSession = await auth.createUser('email', email, {
				password,
				user_data: {
					name: fullName,
					bio: '',
					profilePic: false,
					favAuthor: '',
					favGenre: '',
					isAuthor: false,
					favBook: ''
				}
			});
			setCookie(cookies, ...userSession.cookies);
			// console.log(userSession);

			const bookshelfNames = ['Favourites', 'Currently Reading', 'Want to Read', 'Finished Reading']

			const promises:any[] = []

			bookshelfNames.forEach(name => {
				const bookshelfInput: Prisma.PrismaBookshelfCreateInput = {
					name: name,
					isDeletable: false,
					creationDate: new Date(),
					user: {connect: {id: userSession.user.user_id}}
				}

				promises.push(prismaClient.prismaBookshelf.create({
					data: bookshelfInput
				}))
			})

			//wait for all bookshelves to be created
			Promise.all(promises);

			// Create user profile, which has username as the user's name in database
			return { success: true };
		} catch (err) {
			const error = err as Error;
			console.log(error.message);
			throw redirect(303, '/authentication/failed');
		}
	}
}
