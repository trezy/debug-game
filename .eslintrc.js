module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:editorconfig/all',
		'plugin:jsdoc/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:optimize-regex/recommended',
		'plugin:promise/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:react-perf/recommended',
		'plugin:react-prefer-function-component/recommended',
		'plugin:security/recommended',
	],
	overrides: [
		{
			files: ['*.jsx'],
			rules: {
				'jsdoc/require-returns': ['off']
			}
		},
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
	},
	plugins: [
		'editorconfig',
		'jsdoc',
		'react',
		'react-prefer-function-component',
		'security',
		'sort-class-members',
		'unused-imports',
	],
	rules: {
		// eslint
		'array-callback-return': ['error'],
		'arrow-parens': ['error', 'as-needed'],
		'camelcase': ['error'],
		'curly': ['error', 'all'],
		'default-case': ['error'],
		'default-case-last': ['error'],
		'default-param-last': ['error'],
		'eqeqeq': ['error'],
		// 'multiline-comment-style': ['error', 'starred-block'],
		'no-alert': ['error'],
		'no-confusing-arrow': ['error'],
		'no-constructor-return': ['error'],
		'no-duplicate-imports': ['error'],
		'no-eval': ['error'],
		'no-lonely-if': ['error'],
		'no-nested-ternary': ['error'],
		'no-plusplus': ['error'],
		'no-proto': ['error'],
		'no-promise-executor-return': ['error'],
		'no-return-await': ['error'],
		'no-script-url': ['error'],
		'no-self-compare': ['error'],
		'no-sequences': ['error'],
		'no-shadow': ['error'],
		'no-undefined': ['error'],
		'no-unmodified-loop-condition': ['error'],
		'no-unneeded-ternary': ['error'],
		'no-unreachable-loop': ['error'],
		'no-unused-expressions': ['error'],
		'no-unused-labels': ['error'],
		'no-unused-private-class-members': ['error'],
		'no-use-before-define': ['error'],
		'no-useless-call': ['error'],
		'no-useless-computed-key': ['error'],
		'no-useless-concat': ['error'],
		'no-useless-constructor': ['error'],
		'no-useless-rename': ['error'],
		'no-useless-return': ['error'],
		'no-var': ['error'],
		'no-void': ['error'],
		'prefer-const': ['error'],
		'prefer-exponentiation-operator': ['error'],
		'prefer-object-has-own': ['error'],
		'prefer-object-spread': ['error'],
		'prefer-regex-literals': ['error'],
		'prefer-spread': ['error'],
		'prefer-rest-params': ['error'],
		'prefer-template': ['error'],
		'radix': ['error'],
		'require-atomic-updates': ['error'],
		'require-await': ['error'],
		'require-unicode-regexp': ['error'],
		'semi': ['error', 'never', {
			beforeStatementContinuationChars: 'always',
		}],
		'sort-class-members/sort-class-members': ['error', {
			accessorPairPositioning: 'getThenSet',
			order: [
				'[static-properties]',
				'[static-methods]',
				'[conventional-private-properties]',
				'[properties]',
				'constructor',
				'[methods]',
				'[conventional-private-methods]',
			],
		}],
		'sort-imports': ['error', {
			allowSeparatedGroups: true,
			ignoreCase: true,
			memberSyntaxSortOrder: [
				'none',
				'multiple',
				'single',
				'all',
			],
		}],
		'no-new-func': ['off'],

		// editorconfig
		'editorconfig/indent': ['error', {
			'SwitchCase': 1,
		}],

		// jsdoc
		'jsdoc/require-jsdoc': ['error', {
			require: {
				ArrowFunctionExpression: true,
				ClassDeclaration: true,
				ClassExpression: true,
				FunctionDeclaration: true,
				FunctionExpression: true,
				MethodDefinition: true,
			},
		}],

		// react
		'react/boolean-prop-naming': ['error'],
		'react/default-props-match-prop-types': ['error'],
		'react/destructuring-assignment': ['error'],
		'react/forbid-elements': ['error', {
			forbid: [
				{
					element: 'button',
					message: 'Use <Button> component instead.',
				}
			],
		}],
		'react/jsx-boolean-value': ['error'],
		'react/jsx-closing-bracket-location': ['error', 'after-props'],
		'react/jsx-curly-brace-presence': ['error', 'always'],
		'react/jsx-filename-extension': ['error'],
		'react/jsx-first-prop-new-line': ['error', 'multiline'],
		'react/jsx-handler-names': ['error'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-key': ['error'],
		'react/jsx-max-props-per-line': ['error'],
		'react/jsx-no-script-url': ['error'],
		'react/jsx-no-useless-fragment': ['error'],
		'react/jsx-pascal-case': ['error'],
		'react/jsx-props-no-multi-spaces': ['error'],
		'react/jsx-sort-props': ['error', {
			reservedFirst: true,
		}],
		'react/jsx-wrap-multilines': ['error', {
			declaration: 'parens-new-line',
			assignment: 'parens-new-line',
			return: 'parens-new-line',
			arrow: 'parens-new-line',
			condition: 'parens-new-line',
			logical: 'parens-new-line',
			prop: 'parens-new-line'
		}],
		'react/no-danger': ['error'],
		'react/no-invalid-html-attribute': ['error'],
		'react/no-typos': ['error'],
		'react/no-unused-prop-types': ['error'],
		'react/prefer-stateless-function': ['error'],
		'react/require-default-props': ['error'],
		'react/self-closing-comp': ['error'],
		'react/sort-prop-types': ['error'],
		'react/style-prop-object': ['error'],
		'react/void-dom-elements-no-children': ['error'],

		// react-prefer-function-component
		'react-prefer-function-component/react-prefer-function-component': ['error', {
			allowComponentDidCatch: false,
		}],

		// security
		'security/detect-object-injection': ['off'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
