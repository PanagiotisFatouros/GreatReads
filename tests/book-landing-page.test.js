import { expect, test, webkit } from '@playwright/test';
// import { getBookInfo } from '../src/lib/functions';

const testUser= {
	name: "test",
	id: "xdmGfNtS",
	profilePic: "",
	reviews: [],
	bio: ""
}


// test.beforeAll(async ({ request }) => {
// 	// Create a new repository
// 	const response = await request.post('/user/repos', {
// 	  data: {
// 		name: REPO
// 	  }
// 	});
// 	expect(response.ok()).toBeTruthy();
//   });

// test('Empty Test', async ({ page }) => {
// 	await page.goto('https://playwright.dev/');
// 	const name = await page.innerText('.navbar__title');
// 	expect(name).toBe('Playwright');
// });



test('Valid= Book - Book Landing Page', async({ request }) => {
	const validBookId = "zyTCAlFPjgYC"
	const response = await request.get(`https://greatreads.azurewebsites.net/api/read/books/${validBookId}/${testUser.id}`)
	console.log(response?.status())
})


test('Books Landing Page - Not Logged In', async({ page, baseURL }) => {
	const validBookId = "zyTCAlFPjgYC"
	await page.goto(`${baseURL}/books/${validBookId}`)
	await page.waitForURL("**/authentication")
})

test('Books Landing page - Logged In', async({ page, baseURL}) => {
	const validBookId = "zyTCAlFPjgYC"
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
