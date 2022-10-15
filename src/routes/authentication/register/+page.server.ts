import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import { setCookie } from 'lucia-sveltekit';

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
					profilePicExt: null,
					favAuthor: '',
					favGenre: '',
					isAuthor: false,
					favBook: ''
				}
			});
			setCookie(cookies, ...userSession.cookies);
			console.log(userSession);

			// Create user profile, which has username as the user's name in database
			return { success: true };
		} catch (err) {
			const error = err as Error;
			console.log(error.message);
			throw redirect(303, '/authentication/failed');
		}
	}
}
