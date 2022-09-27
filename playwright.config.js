/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	testDir: 'tests',
	timeout: 3000,
	webServer: {
		command: 'npm run preview',
		port: 3000,
		reuseExistingServer: !process.env.CI,
	}
};

export default config;
