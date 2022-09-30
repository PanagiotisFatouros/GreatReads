import { expect, test } from '@playwright/test';

test('Empty Test', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	const name = await page.innerText('.navbar__title');
	expect(name).toBe('Playwright');
});
