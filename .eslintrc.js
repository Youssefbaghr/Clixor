module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
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

    'spaced-comment': ['error', 'always', { markers: ['/'] }],

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

    'no-loop-func': 'error',
    'prefer-arrow-callback': 'error',

    // Variable rules
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

    // Error handling
    'no-throw-literal': 'error',

    'max-len': ['error', { code: 100, ignoreUrls: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'no-trailing-spaces': 'error',
  },
};
