import { test } from '@playwright/test';

test('Login-Good-Credentials', async ({ page, baseURL }) => {
	await page.goto(`${baseURL}/authentication`);
	await page.fill('input[name="username"]', 'test');
	await page.fill('input[name="password"]', 'test');
	await page.click('button >> text=Login');
	await page.waitForURL('**/success');
});

test('Login-Bad-Credentials', async ({ page, baseURL }) => {
	await page.goto(`${baseURL}/authentication`);
	await page.fill('input[name="username"]', 'test');
	await page.fill('input[name="password"]', 'test1');
	await page.click('button >> text=Login');
	await page.waitForURL('**/failed');
});
