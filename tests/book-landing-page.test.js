import { expect, test, webkit } from '@playwright/test';
// import { getBookInfo } from '../src/lib/functions';

const testUser= {
	name: "test",
	id: "xdmGfNtS",
	profilePic: "",
	reviews: [],
	bio: ""
}

const invalidBookId = "nosuchbook12"
const validBookId = "zyTCAlFPjgYC"

test('Valid Book Page (Not Logged In)', async({ page, baseURL }) => {
	await page.goto(`${baseURL}/books/${validBookId}`)
	await page.waitForURL("**/authentication")
})

test('Valid Book Page (Logged In)', async({ page, baseURL}) => {
	const bookName = "The Google Story (2018 Updated Edition)"
	const h1ClassName = "text-heading1 font-heading text-secondary mr-5"
	await page.goto(`${baseURL}/authentication`)
	await page.fill('input[name="username"]', "test")
	await page.fill('input[name="password"]', "test")
	await page.click('button >> text=Login')
	await page.waitForURL("**/success")
	await page.goto(`${baseURL}/books/${validBookId}`)
	await page.waitForURL(`**/${validBookId}`)
	expect(await page.innerText(`h1.text-heading1.font-heading.text-secondary.mr-5`)).toBe(bookName)
	
})

test('Invalid Book Page', async({ page, baseURL }) => {
	const response = await page.goto(`${baseURL}/api/read/books/${invalidBookId}}/${testUser.id}`);
	await expect(response?.ok()).toBeFalsy()
})
