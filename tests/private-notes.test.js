import { expect, test } from '@playwright/test';

const validBookId = 'zyTCAlFPjgYC';

test('Create, Edit and Delete Private Collections', async ({ page, baseURL }) => {

    // Sign in & Go to Book's page
	const bookName = 'The Google Story (2018 Updated Edition)';
	const h1ClassName = `h1.text-heading1.font-heading.text-secondary.mr-5`;
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'notestest@testing.com');
	await page.fill('input[name="password"]', 'test');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');
	await page.goto(`${baseURL}/books/${validBookId}`);
	await page.waitForURL(`**/${validBookId}`);
	expect(await page.innerText(h1ClassName)).toBe(bookName);

    // Create Private Collection
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div.text-secondary.flex.justify-center.space-x-5 > div:nth-child(2) > button > h2').click();
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.mt-3.flex > button > p');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.mt-3.flex > button > p').click();
    await page.waitForSelector('#collectionForm > input');
    await page.fill('#collectionForm > input', 'Private Collection');
    await page.waitForSelector('#collectionForm > div > div.mt-1 > button.btn.bg-accent.text-white.rounded-full > p');
    await page.click('#collectionForm > div > div.mt-1 > button.btn.bg-accent.text-white.rounded-full > p'); 

    // Check Private Collection Exists
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.mt-1 > div');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.mt-1 > div').click();

    // Create Note
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.flex-col.mt-3.space-y-2 > input');
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.flex-col.mt-3.space-y-2 > textarea');
    await page.fill('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.flex-col.mt-3.space-y-2 > input', 'New Private Note');
    await page.fill('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.flex-col.mt-3.space-y-2 > textarea', 'This is a newly created private note for testing');
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.flex-col.mt-3.space-y-2 > button');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.flex-col.mt-3.space-y-2 > button').click();

    // Check Note was created
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.space-y-4.mt-1.mb-5 > div > div > div.flex.items-center > p');
    expect(await page.innerText('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.space-y-4.mt-1.mb-5 > div > div > div.flex.items-center > p')).toBe('New Private Note');

    // Edit Existing note 
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.space-y-4.mt-1.mb-5 > div > div > div.space-x-2 > button:nth-child(1) > svg');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.space-y-4.mt-1.mb-5 > div > div > div.space-x-2 > button:nth-child(1) > svg').click();
    await page.waitForSelector('#noteInput > div > input');
    await page.fill('#noteInput > div > input', 'Edited Private Note');
    await page.waitForSelector('#noteInput > div > div.self-end > button:nth-child(2)');
    await page.locator('#noteInput > div > div.self-end > button:nth-child(2)').click();

    // Check that note was edited
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.space-y-4.mt-1.mb-5 > div > div > div.flex.items-center > p:has-text("Edited Private Note")');

    // Delete Collection
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.justify-between.items-center.mt-3 > div.flex.items-center.space-x-3 > button:nth-child(3) > svg');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.justify-between.items-center.mt-3 > div.flex.items-center.space-x-3 > button:nth-child(3) > svg').click();
    await page.waitForSelector('#confirmation > div > button.btn.bg-accent.text-white.rounded-full');
    await page.locator('#confirmation > div > button.btn.bg-accent.text-white.rounded-full').click();
    // Check Collection no longer exists
    await expect(page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.mt-1 > div')).toHaveCount(0);
});

