import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
	{
		ignores: [
			'dist/*',
			'coverage/*',
			'.output/*',
			'.nuxt/*',
			'**/dist',
			'**/node_modules',
			'**/.output',
			'**/.yarn',
			'**/.nuxt',
		],
	},
	{
		extends: [
			eslint.configs.recommended,
			...typescriptEslint.configs.recommended,
			...eslintPluginVue.configs['flat/recommended'],
		],
		files: ['**/*.{ts,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: {
				parser: typescriptEslint.parser,
			},
		},
		rules: {
      // place your rules here for example @typescript-eslint/no-unused-vars:
			'@typescript-eslint/no-unused-vars': 'error',
    },
	},
);
