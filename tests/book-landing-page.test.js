import { expect, test } from '@playwright/test';
// import { getBookInfo } from '../src/lib/functions';

const testUser = {
	name: 'test',
	id: 'xdmGfNtS',
	profilePic: false,
	reviews: [],
	bio: ''
};

const invalidBookId = 'nosuchbook12';
const validBookId = 'zyTCAlFPjgYC';

test('Valid Book Page (Not Logged In)', async ({ page, baseURL }) => {
	await page.goto(`${baseURL}/books/${validBookId}`);
	await page.waitForURL(`**/${validBookId}`);
});

test('Valid Book Page (Logged In)', async ({ page, baseURL }) => {
	const bookName = 'The Google Story (2018 Updated Edition)';
	const h1ClassName = `h1.text-heading1.font-heading.text-secondary.mr-5`;
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'test@testing.com');
	await page.fill('input[name="password"]', '06UyM4hQ');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');
	await page.goto(`${baseURL}/books/${validBookId}`);
	await page.waitForURL(`**/${validBookId}`);
	expect(await page.innerText(h1ClassName)).toBe(bookName);
	await page.goto('/sign-out');
	await page.waitForURL('**/authentication');
});

test('Invalid Book Page', async ({ page, baseURL }) => {
	const response = await page.goto(`${baseURL}/api/read/books/${invalidBookId}}/${testUser.id}`);
	await expect(response?.ok()).toBeFalsy();
});
