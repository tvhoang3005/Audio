import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    { ignores: ['dist', 'coverage'] },
    js.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    reactHooks.configs.flat['recommended-latest'],
    reactRefresh.configs.vite,
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            // React 19 no longer checks propTypes at runtime.
            'react/prop-types': 'off',
        },
    },
    {
        files: ['**/*.test.{js,jsx}', 'src/test/**'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
    },
];
