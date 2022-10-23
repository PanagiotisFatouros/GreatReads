import { expect, test } from '@playwright/test';

const validBookId = 'zyTCAlFPjgYC';


test('Add book to & Remove book from bookshelves', async ({ page, baseURL }) => {

    // Sign in & Go to Book's page
	const bookName = 'The Google Story (2018 Updated Edition)';
	const h1ClassName = `h1.text-heading1.font-heading.text-secondary.mr-5`;
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'librarytest@testing.com');
	await page.fill('input[name="password"]', 'test');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');
    await page.waitForSelector('#bookshelves');
    await expect(page.locator('#bookshelves > div:nth-child(1) > div > #books-container > div > p:has-text("The Google Story (2018 Updated Edition)")')).toHaveCount(0);
    
    // Go To Books Page and add Book to Favourites Bookshelf
	await page.goto(`${baseURL}/books/${validBookId}`);
	await page.waitForURL(`**/${validBookId}`);
	expect(await page.innerText(h1ClassName)).toBe(bookName);
    
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-3.flex.justify-center.items-center.flex-col.self-start > button');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-3.flex.justify-center.items-center.flex-col.self-start > button').click();

    await page.waitForSelector('#save > div.flex.flex-col.w-full.space-y-3.mt-3 > label:has-text("Favourites")');
    await page.locator('#save > div.flex.flex-col.w-full.space-y-3.mt-3 > label:has-text("Favourites")').click();
    await page.locator('#save > div.mt-3.self-end.space-x-2 > button.btn.bg-accent.text-white.rounded-full.px-4.py-1').click();

    // Check whether Book added to Favourites bookshelf
    await page.goto(`${baseURL}`);
    await page.waitForSelector('#bookshelves > div:nth-child(1)')
    // await page.waitForSelector('#bookshelves > div:nth-child(1) > div > div#books-container');
    // await page.waitForSelector('#bookshelves > div:nth-child(1) > div > div#books-container > div > p:has-text("The Google Story (2018 Updated Edition)")');
    // await expect(page.locator('#bookshelves > div:nth-child(1) > div > div#books-container > div > p:has-text("The Google Story (2018 Updated Edition)")')).toHaveCount(1);

    // See all Books in Favourites then remove 
    await page.waitForSelector('#bookshelves > div:nth-child(1) > div > div#header > span');
    await page.locator('#bookshelves > div:nth-child(1) > div > div#header > span').click();
    await page.waitForURL('**/bookshelves/179')
    console.log(page.url);
    await page.waitForSelector('#bookCard > button > div > p:has-text("Saved")');
    await page.locator('#bookCard > button > div > p:has-text("Saved")').click();
    await page.waitForSelector('#save > div.flex.flex-col.w-full.space-y-3.mt-3 > label:has-text("Favourites")');
    await page.locator('#save > div.flex.flex-col.w-full.space-y-3.mt-3 > label:has-text("Favourites")').click();
    await page.locator('#save > div.mt-3.self-end.space-x-2 > button.btn.bg-accent.text-white.rounded-full.px-4.py-1').click();
    
    // Back To Home Page, Check no more book in favourites
    await page.waitForSelector('body > div > div.mt-6.mx-8 > div.text-primary-3.text-heading2.font-heading.flex.items-center > button');
    await page.locator('body > div > div.mt-6.mx-8 > div.text-primary-3.text-heading2.font-heading.flex.items-center > button').click();
    page.reload;
    await page.waitForSelector('#bookshelves');
    await expect(page.locator('#bookshelves > div:nth-child(1) > div > #books-container > div > p:has-text("The Google Story (2018 Updated Edition)")')).toHaveCount(0);
    await page.goto('/sign-out')
    await page.waitForURL('**/authentication')
});

test('Add and delete bookshelf', async ({ page, baseURL }) => {

    await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'librarytest@testing.com');
	await page.fill('input[name="password"]', 'test');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');


    await page.goto(`${baseURL}/library/bookshelves`);
    await page.waitForURL(`**/bookshelves`);
    await page.waitForSelector('body > div > div.mt-6.mx-8 > div.mb-3.flex > div.flex.justify-center > button');
    await page.locator('body > div > div.mt-6.mx-8 > div.mb-3.flex > div.flex.justify-center > button').click();
    await page.waitForSelector('#main > div.flex > input');
    await page.fill('#main > div.flex > input', 'New Test Bookshelf');
    await page.waitForSelector('#main > div.flex.justify-center.space-x-3 > button:nth-child(2)');
    await page.locator('#main > div.flex.justify-center.space-x-3 > button:nth-child(2)').click();

    // Check created
    page.reload;
    await page.waitForSelector('body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div.flex.items-center.space-x-1.svelte-wtmzbz > p:has-text("New Test Bookshelf")');
    await expect(page.locator('body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div.flex.items-center.space-x-1.svelte-wtmzbz > p:has-text("New Test Bookshelf")')).toHaveCount(1);
    
    // Then Delete 
    await page.locator('body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div.flex.items-center.space-x-1.svelte-wtmzbz > p:has-text("New Test Bookshelf")').click();
    await page.waitForSelector('body > div > div.mt-6.mx-8 > div.text-primary-3.text-heading3.font-heading.flex > button > p');
    await page.locator('body > div > div.mt-6.mx-8 > div.text-primary-3.text-heading3.font-heading.flex > button > p').click();
    await page.waitForSelector('#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p');
    await page.locator('#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p').click();

    // Check 
    page.reload;
    await page.waitForSelector('body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div.flex.items-center.space-x-1.svelte-wtmzbz');
    await expect(page.locator('body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div.flex.items-center.space-x-1.svelte-wtmzbz > p:has-text("New Test Bookshelf")')).toHaveCount(0);
    await page.goto('/sign-out')
    await page.waitForURL('**/authentication')
})