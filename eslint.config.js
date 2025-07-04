// @ts-check
import eslintReact from '@eslint-react/eslint-plugin';
import eslintJs from '@eslint/js';
import queryPlugin from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],

  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs['recommended-typescript'],
    ...queryPlugin.configs['flat/recommended'],
  ],

  // Configure language/parsing options
  languageOptions: {
    // Use TypeScript ESLint parser for TypeScript files
    parser: tseslint.parser,
    parserOptions: {
      // Enable project service for better TypeScript integration
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },

  // Custom rule overrides (modify rule levels or disable rules)
  rules: {
    '@eslint-react/no-missing-key': 'warn',
    '@eslint-react/dom/no-missing-button-type': 'off',
  },
});
