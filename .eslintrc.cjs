module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	rules: {
		// enable additional rules
		indent: ['warn', 4],
		semi: ['warn', 'always']
	},
	plugins: ['svelte3', '@typescript-eslint'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		requireConfigFile: false,
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	settings: {
		'svelte3/typescript': () => require('typescript') // pass the TypeScript package to the Svelte plugim
	}
};
