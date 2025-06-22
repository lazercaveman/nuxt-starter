import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
	{
		ignores: [
      'node_modules',
      'coverage',
      'dist',
      '.output',
      '.nuxt',
      '.yarn',
		],
	},
	{
		extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...typescriptEslint.configs.recommendedTypeCheckedOnly,
      ...eslintPluginVue.configs['flat/recommended'],
		],
		files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'],
        parser: typescriptEslint.parser,
        vueFeatures: {
          filter: true,
          interpolationAsNonHTML: false,
        },
      },
    },
		rules: {
      // place your rules here!
      // For example:
			'@typescript-eslint/no-unused-vars': 'error',
			'vue/multi-word-component-names': [
				'error',
				{
					ignores: [
						'index',
						'demo',
						'default',
						'error',
						'[id]',
					],
				},
			],
    },
	},
  {
    files: ['nuxt.config.ts'],
    rules: {
      // For some reason the tailwind plugin currently has problems with this rule
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
);
