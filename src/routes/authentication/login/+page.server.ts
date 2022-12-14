import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { auth } from '../../../lib/lucia';
import { setCookie } from 'lucia-sveltekit';
// import { createNewEntity } from "../../database/mysql";

export const actions: Actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString() || '';
		const password = data.get('password')?.toString() || '';
		try {
			const userSession = await auth.authenticateUser('email', email, password);
			setCookie(cookies, ...userSession.cookies);
			console.log('Successfully signed in');
			console.log(url);
			return { success: true };
		} catch (e) {
			const error = e as Error;
			console.log(error.message);
			throw redirect(303, '/authentication/failed');
			// return {success: false}
			// if (
			//     error.message === "AUTH_INVALID_IDENTIFIER_TOKEN" ||
			//     error.message === "AUTH_INVALID_PASSWORD"
			// ) {
			//     throw invalid(400, {
			//         message: "Incorrect username or password",
			//     });
			// }
			// // database connection error
			// throw invalid(400, {
			//     message: "Unknown error",
			// })
		}
	}
};

//   Helper Function - Create User Profile
// async function createUser(username: String){
//     const userFields = "(Name, Bio, Profile_Picture, FavAuthor, FavGenre, IsAuthor, FavBook)"
//     const userValues = `('${username}', null, null, null, null, null, null)`
//     await createNewEntity("user", userFields, userValues).catch((err) => {
//         if (err === "ER_BAD_FIELD_ERROR") return false
//     })
//     return true
// }
