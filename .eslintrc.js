module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'preact',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 2,

    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,
  },
  settings: {
    react: {
      pragma: 'h',
      version: 'detect',
    },
  },
};
