import { expect, test } from '@playwright/test';

const testUser= {
	name: "test",
	id: "xdmGfNtS",
	profilePic: "",
	reviews: [],
	bio: ""
}

test('Valid Book', async ({ page, baseURL }) => {
	const validBookId = "zyTCAlFPjgYC"
	const response = await page.goto(`${baseURL}/api/read/books/${validBookId}/${testUser.id}`);
	await expect(response?.ok()).toBeTruthy()
});

test('Invalid Book - Book Landing Page', async({ page, baseURL }) => {
	const invalidBookId = "nosuchbook12"
	const response = await page.goto(`${baseURL}/api/read/books/${invalidBookId}}/${testUser.id}`);
	await expect(response?.ok()).toBeFalsy()
})