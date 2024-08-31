module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // General JavaScript/TypeScript rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],

    // Import rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',

    // Async/Promise rules
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'warn',
    'prefer-promise-reject-errors': 'error',

    // Object rules
    'object-shorthand': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],

    // Array rules
    'array-callback-return': 'error',

    // Function rules
    'func-style': ['error', 'expression'],
    'no-loop-func': 'error',
    'prefer-arrow-callback': 'error',

    // Variable rules
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

    // Error handling
    'no-throw-literal': 'error',

    // Whitespace and formatting (in case Prettier misses something)
    'linebreak-style': ['error', 'unix'],
    'max-len': ['error', { code: 100, ignoreUrls: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'no-trailing-spaces': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
