import globals from 'globals';
import js from '@eslint/js';

import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-n';
import securityPlugin from 'eslint-plugin-security';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ languageOptions: { globals: { ...globals.node, ...globals.commonjs } } },
	{
		plugins: {
			n: nodePlugin,
		},
		rules: {
			// Node.js 特定规则
			'n/no-missing-require': 'error',
			'n/no-unpublished-require': 'error',
			'n/no-deprecated-api': 'warn',
			'n/no-process-exit': 'warn',
		},
	},
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			// Import 规则
			'import/no-unresolved': 'error',
			'import/named': 'error',
			'import/default': 'error',
			'import/no-absolute-path': 'error',
		},
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.js', '.json'],
				},
			},
		},
	},
	{
		plugins: {
			security: securityPlugin,
		},
		// 使用插件提供的推荐配置
		rules: {
			...securityPlugin.configs.recommended.rules,
		},
	},
	{
		ignores: ['node_modules/**', 'dist/**', '**/*.min.js'],
	},
];
