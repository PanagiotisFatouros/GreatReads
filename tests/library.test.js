import { expect, test } from '@playwright/test';

const validBookId = 'zyTCAlFPjgYC';
function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}

test('Add book to & Remove book from bookshelves', async ({ page, baseURL }) => {
	// Sign in & Go to Book's page
	const bookName = 'The Google Story (2018 Updated Edition)';
	const h1ClassName = `h1.text-heading1.font-heading.text-secondary.mr-5`;
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'librarytest@testing.com');
	await page.fill('input[name="password"]', '06UyM4hQ');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');
	await page.waitForSelector('#bookshelves');
	await expect(
		page.locator(
			'#bookshelves > div:nth-child(1) > div > #books-container > div > p:has-text("The Google Story (2018 Updated Edition)")'
		)
	).toHaveCount(0);

	// Go To Books Page and add Book to Favourites Bookshelf
	await page.goto(`${baseURL}/books/${validBookId}`);
	await page.waitForURL(`**/${validBookId}`);
	expect(await page.innerText(h1ClassName)).toBe(bookName);

	await page.waitForSelector(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-3.flex.justify-center.items-center.flex-col.self-start > button'
	);
	await page
		.locator(
			'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-3.flex.justify-center.items-center.flex-col.self-start > button'
		)
		.click();

	await page.waitForSelector(
		'#save > div.flex.flex-col.w-full.space-y-3.mt-3 > label:has-text("Favourites")'
	);
	await page
		.locator('#save > div.flex.flex-col.w-full.space-y-3.mt-3 > label:has-text("Favourites")')
		.click();
	await page
		.locator(
			'#save > div.mt-3.self-end.space-x-2 > button.btn.bg-accent.text-white.rounded-full.px-4.py-1'
		)
		.click();
	await delay(5000);

	// Check whether Book added to Favourites bookshelf
	await page.locator('#logo').click();
	await page.waitForNavigation({ url: baseURL, waitUntil: 'domcontentloaded' });
	await page.reload();
	await delay(5000);
	await page.waitForSelector('#bookshelves');
	await expect(
		page.locator(
			'#bookshelves > div:nth-child(1) > div > #books-container > div > p:has-text("The Google Story (2018 Updated Edition)")'
		)
	).toHaveCount(1);
	await delay(2000);

	// See all Books in Favourites then remove
	await page.locator('#bookshelves > div:nth-child(1) > div > div#header > span').click();
	console.log(page.url());

	// await page.waitForSelector('body > div > div.mx-6.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > button');
	// await page.locator('body > div > div.mx-6.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > button').click();
	// await page.waitForSelector('#save > div.flex.flex-col.w-full.space-y-3.mt-3 > label:has-text("Favourites")');
	// await page.locator('#save > div.flex.flex-col.w-full.space-y-3.mt-3 > label:has-text("Favourites")').click();
	// await page.locator('#save > div.mt-3.self-end.space-x-2 > button.btn.bg-accent.text-white.rounded-full.px-4.py-1').click();
	await page.waitForNavigation({ url: '**/bookshelves/282', waitUntil: 'domcontentloaded' });
	await delay(10000);
	await page.locator('button', { hasText: 'Saved' }).click();
	await page.locator('label', { hasText: 'Favourites' }).click();
	await page.locator('button', { hasText: 'Confirm' }).click();
	await delay(5000);

	// Back To Home Page, Check no more book in favourites
	console.log(page.url());
	await page.locator('#logo').click();
	console.log(page.url());
	await page.waitForNavigation({ url: baseURL, waitUntil: 'domcontentloaded' });
	await page.reload();
	await delay(5000);
	await page.waitForSelector('#bookshelves');
	await expect(
		page.locator(
			'#bookshelves > div:nth-child(1) > div > #books-container > div > p:has-text("The Google Story (2018 Updated Edition)")'
		)
	).toHaveCount(0);
	await page.goto('/sign-out');
	await page.waitForURL('**/authentication');
});

test('Add and delete bookshelf', async ({ page, baseURL }) => {
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'librarytest@testing.com');
	await page.fill('input[name="password"]', '06UyM4hQ');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');

	await page.goto(`${baseURL}/library/bookshelves`);
	await page.waitForURL(`**/bookshelves`);
	await delay(5000);
	await page.waitForSelector(
		'body > div > div.mt-6.mx-8 > div.mb-3.flex > div.flex.justify-center > button'
	);
	await page
		.locator('body > div > div.mt-6.mx-8 > div.mb-3.flex > div.flex.justify-center > button')
		.click();
	await page.waitForSelector('#main > div.flex > input');
	await page.fill('#main > div.flex > input', 'New Test Bookshelf');
	await page.waitForSelector('#main > div.flex.justify-center.space-x-3 > button:nth-child(2)');
	await page.locator('#main > div.flex.justify-center.space-x-3 > button:nth-child(2)').click();
	await delay(5000);

	// Check created
	await page.waitForSelector(
		'body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div'
	);
	await page.reload();
	await delay(5000);
	await page.waitForSelector(
		'body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div > p:has-text("New Test Bookshelf")'
	);
	await expect(
		page.locator(
			'body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div > p:has-text("New Test Bookshelf")'
		)
	).toHaveCount(1);

	// Then Delete
	await delay(5000);
	await page
		.locator(
			'body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div > p:has-text("New Test Bookshelf")'
		)
		.click();
	await page.locator('button:has-text("Delete Bookshelf")').click();
	await page.waitForSelector(
		'#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p'
	);
	await page
		.locator('#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p')
		.click();
	await delay(5000);

	// Check
	await page.waitForSelector(
		'body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div'
	);
	await page.reload();
	await delay(5000);
	await page.waitForSelector(
		'body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div'
	);
	await expect(
		page.locator(
			'body > div > div.mt-6.mx-8 > div.flex.flex-row.flex-wrap.grow.justify-items-center.items-center > div > div#Header > div > p:has-text("New Test Bookshelf")'
		)
	).toHaveCount(0);
	await page.goto('/sign-out');
	await page.waitForURL('**/authentication');
});
