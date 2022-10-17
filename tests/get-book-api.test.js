import { expect, test } from '@playwright/test';

const testUser = {
	name: 'test',
	id: 'xdmGfNtS',
	profilePic: false,
	reviews: [],
	bio: ''
};

// no such book exists in our database or in Google Books
const invalidBookId = 'nosuchbook12';
const validBookId = 'zyTCAlFPjgYC';

test('Valid Book - GET Request', async ({ request, baseURL }) => {
	console.log(baseURL);
	const response = await request.get(`${baseURL}/api/read/books/${validBookId}/${testUser.id}`);
	await expect(response.ok()).toBeTruthy();
});

test('Invalid Book - GET Request', async ({ request, baseURL }) => {
	console.log(baseURL);
	const response = await request.get(`${baseURL}/api/read/books/${invalidBookId}/${testUser.id}`);
	await expect(response.ok()).toBeFalsy();
});
