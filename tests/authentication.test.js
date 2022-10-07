import { test } from '@playwright/test';

test('Login-Good-Credentials', async ({ page, baseURL }) => {
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'test@testing.com');
	await page.fill('input[name="password"]', 'test');
	await page.click('button >> text=Login');
	await page.waitForURL('**/success');
});

test('Login-Bad-Credentials', async ({ page, baseURL }) => {
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'test@testing.com');
	await page.fill('input[name="password"]', 'test1');
	await page.click('button >> text=Login');
	await page.waitForURL('**/failed');
});
