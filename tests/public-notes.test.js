import { expect, test } from '@playwright/test';

const validBookId = 'zyTCAlFPjgYC';

test('Create, Edit and Delete Public Collections and Notes', async ({ page, baseURL }) => {

    // Sign in & Go to Book's page
	const bookName = 'The Google Story (2018 Updated Edition)';
	const h1ClassName = `h1.text-heading1.font-heading.text-secondary.mr-5`;
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'notestest1@testing.com');
	await page.fill('input[name="password"]', '06UyM4hQ');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');
	await page.goto(`${baseURL}/books/${validBookId}`);
	await page.waitForURL(`**/${validBookId}`);
	expect(await page.innerText(h1ClassName)).toBe(bookName);

    // // Create Public Note
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div.text-secondary.flex.justify-center.space-x-5 > div:nth-child(2) > button > h2').click();
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.mt-3.flex > button > p');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.mt-3.flex > button > p').click();
    await page.waitForSelector('#collectionForm > input');
    await page.fill('#collectionForm > input', 'test Public test Collection');
    await page.waitForSelector('#publicCheckbox');
    await page.click('#publicCheckbox');
    await page.waitForSelector('#collectionForm > div > div.mt-1 > button.btn.bg-accent.text-white.rounded-full');
    await page.click('#collectionForm > div > div.mt-1 > button.btn.bg-accent.text-white.rounded-full'); 

    // Check Public Note Exists
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.mt-1 > div');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.mt-1 > div').click();

    // Refresh page then check whether public notes updated
    await page.reload();
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div.text-secondary.flex.justify-center.space-x-5 > div:nth-child(3) > button > h2').click();
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div:nth-child(2)');
    expect(await page.innerHTML('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div:nth-child(2)')).toContain('test Public test Collection');


    // Then delete note
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div.text-secondary.flex.justify-center.space-x-5 > div:nth-child(2) > button > h2').click();
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.mt-1 > div > div > p.text-secondary:has-text("test Public test Collection")');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.mt-1 > div > div > p.text-secondary:has-text("test Public test Collection")').click();
    await page.waitForSelector('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.justify-between.items-center.mt-3 > div.flex.items-center.space-x-3 > button:nth-child(3) > svg');
    await page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div > div.flex.justify-between.items-center.mt-3 > div.flex.items-center.space-x-3 > button:nth-child(3) > svg').click();
    await page.waitForSelector('#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p');
    await page.locator('#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p').click();

    // Check note longer exists
    await expect(page.locator('body > div > div.grid.grid-cols-10.text-body1.font-body.text-primary-3.mt-1 > div.col-span-5.mt-5.mr-3 > div:nth-child(5) > div > div.flex.flex-col.mt-1 > div > div > p.text-secondary:has-text("test Public test Collection")')).toHaveCount(0);  
    await page.goto('/sign-out')
    await page.waitForURL('**/authentication')
});

