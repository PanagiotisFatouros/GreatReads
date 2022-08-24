module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	rules: {
		// enable additional rules
		indent: ["warning", 4],
		quotes: ["warning", "single"],
		semi: ["warning", "always"],
	},
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parser: "@babel/eslint-parser",
	parserOptions: {
		requireConfigFile: false,
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
