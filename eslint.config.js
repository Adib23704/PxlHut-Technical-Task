import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import nodePlugin from 'eslint-plugin-node'
import prettierConfig from 'eslint-config-prettier'

export default [
	js.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				console: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				setInterval: 'readonly',
				clearInterval: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly'
			}
		},
		plugins: {
			import: importPlugin,
			node: nodePlugin,
			prettier: prettier
		},
		rules: {
			'prettier/prettier': ['error', {}],
			'no-console': 'off',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal'],
					'newlines-between': 'always'
				}
			],
			'node/no-unsupported-features/es-syntax': 'off'
		}
	}
]
