import { expect, test } from '@playwright/test';

const validBookId = 'zyTCAlFPjgYC';

test('Create, Edit and Delete review', async ({ page, baseURL }) => {
	// Sign in & Go to Book's page
	const bookName = 'The Google Story (2018 Updated Edition)';
	const h1ClassName = `h1.text-heading1.font-heading.text-secondary.mr-5`;
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'reviewtest@testing.com');
	await page.fill('input[name="password"]', '06UyM4hQ');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');
	await page.goto(`${baseURL}/books/${validBookId}`);
	await page.waitForURL(`**/${validBookId}`);
	expect(await page.innerText(h1ClassName)).toBe(bookName);

	// Create Review
	const starSelector = `body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.space-y-2.text-body1.font-body > div > div:nth-child(1)`;
	await page.waitForSelector(starSelector);
	await page.waitForSelector('input[type=text]');
	await page.waitForSelector(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.space-y-2.text-body1.font-body > textarea'
	);
	const postButton = 'button.std_button.self-end';
	await page.waitForSelector(postButton);

	await page.locator(starSelector).click();
	await page
		.locator(
			'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.space-y-2.text-body1.font-body > input'
		)
		.click();
	await page.fill(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.space-y-2.text-body1.font-body > input',
		'Test Review'
	);
	await page
		.locator(
			'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.space-y-2.text-body1.font-body > textarea'
		)
		.click();
	await page.fill(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.space-y-2.text-body1.font-body > textarea',
		'This is a sample review'
	);
	await page.locator(postButton).click();
	await page.reload;

	// Check Review Exists
	const newReviewSelectorH2 =
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.bg-primary-1.rounded-lg.my-3.px-3 > div > div.flex.items-center.space-x-3 > div.flex.flex-col.justify-start > div.flex.items-center.text-secondary.space-x-2 > h2#title';
	await page.waitForSelector(newReviewSelectorH2);
	expect(await page.innerText(newReviewSelectorH2)).toBe('Test Review');

	// Edit Review
	await page.waitForSelector(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.bg-primary-1.rounded-lg.my-3.px-3 > div > div:nth-child(2) > button:nth-child(1)'
	);
	await page.click(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.bg-primary-1.rounded-lg.my-3.px-3 > div > div:nth-child(2) > button:nth-child(1)'
	);
	await page.fill(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.space-y-2.text-body1.font-body > input',
		'New Review Title'
	);
	await page.click(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.space-y-2.text-body1.font-body > div.self-end > button:nth-child(2)'
	);
	expect(await page.innerText(newReviewSelectorH2)).toBe('New Review Title');

	// Delete Review
	await page.click(
		'body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.bg-primary-1.rounded-lg.my-3.px-3 > div > div:nth-child(2) > button.ml-3 > svg'
	);
	await page.waitForSelector(
		'#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p'
	);
	await page.click('#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p');

	// Check Review no longer exists
	await page.reload;
	await expect(page.locator(newReviewSelectorH2)).toHaveCount(0);
	await page.goto('/sign-out');
	await page.waitForURL('**/authentication');
});
