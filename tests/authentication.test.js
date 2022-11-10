import { test } from '@playwright/test';

// test('Register Account & Delete Account', async ({page, baseURL}) => {

// 	// At registration page
// 	await page.goto(`${baseURL}/authentication/register`);
// 	await page.fill('input[name="fullName"]', 'Register Delete Test');
// 	await page.fill('input[name="email"]', 'test1@testing.com');
// 	await page.fill('input[name="password"]', '06UyM4hQ');
// 	await page.fill('input[name=confirmPassword]', '06UyM4hQ');
// 	await page.locator('#panel > form > button').click();

// 	// At home page
// 	await page.waitForNavigation({url: baseURL, waitUntil: 'domcontentloaded'});
// 	await page.locator('#rightNav > div > button').click();
// 	await page.locator('#dropdown-content > a:nth-child(1)').click();
// 	await page.waitForNavigation({url: '**/settings', waitUntil: 'domcontentloaded'});

// 	// At settings page click delete button & confirm
// 	await page.locator('body > div > div.mx-5.my-4 > div:nth-child(2) > div.mt-3.mr-24.w-full.font-body.space-y-6 > div:nth-child(3) > button').click();
// 	await page.locator('#confirmation > div > button.btn.bg-accent.text-white.rounded-full > p').click();

// 	// Back at authentication page
// 	await page.waitForURL('**/authentication');
// });

test('Login-Good-Credentials', async ({ page, baseURL }) => {
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'test@testing.com');
	await page.fill('input[name="password"]', '06UyM4hQ');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/success');
	await page.goto('/sign-out');
	await page.waitForURL('**/authentication');
});

test('Login-Bad-Credentials', async ({ page, baseURL }) => {
	await page.goto(`${baseURL}/authentication/login`);
	await page.fill('input[name="email"]', 'test@testing.com');
	await page.fill('input[name="password"]', '06UyM4hQ1');
	await page.click('button >> text=Submit');
	await page.waitForURL('**/failed');
});
