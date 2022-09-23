import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { createNewEntity } from '../../../../database/mysql';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		bookId: params.bookId
	};
}

export const actions: Actions = {
	createNewCollection: async ({ request }) => {
		const data = await request.formData();
		const userId = data.get('userId')?.toString() || '';
		const bookId = data.get('bookId')?.toString() || '';
		const title = data.get('title')?.toString() || '';
		console.log(title, userId, bookId);

		try {
			// Create user profile, which has username as the user's name in database
			await createCollection(userId, bookId, title).then((success) => {
				if (success) {
					console.log('Collection successfully created');
					return { success: true };
				} else {
					return { success: false };
				}
			});
		} catch (err) {
			const error = err as Error;
			console.log(error.message);
			throw redirect(303, '/');
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
			// });
		}
	}
};

//   Helper Function - Create User Profile
async function createCollection(userId: String, bookId: String, title: String) {
	const table = 'collection';
	const collectionFields = '(Title, CreationDate, IsPublic, Upvotes, BookId, UserId)';
	const creationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const collectionValues = `('${title}', '${creationDate}', '0', '0', '${bookId}', '${userId}')`;
	await createNewEntity(table, collectionFields, collectionValues).catch((err) => {
		console.log('Error occured: ', err);
		return false;
	});
	return true;
}
