/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	testDir: 'tests',
	timeout: 120000,
	webServer: {
		command: 'npm run preview',
		port: 3000,
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: 'http://127.0.0.1:3000',
		browserName: 'chromium'
	},
	workers: 1
};

export default config;
