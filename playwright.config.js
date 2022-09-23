/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'npm run preview',
		port: 3000
	}
};

export default config;
