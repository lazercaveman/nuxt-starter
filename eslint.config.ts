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
    files: ['**/*.{ts,vue,js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parser: typescriptEslint.parser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
        vueFeatures: {
          filter: true,
          interpolationAsNonHTML: false,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'vue/multi-word-component-names': [
        'error',
        { ignores: ['index','demo','default','error','[id]'] }
      ],
    },
  },
  {
    files: ['nuxt.config.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
);
