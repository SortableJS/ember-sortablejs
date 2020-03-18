module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    'cypress/globals': true,
  },
  extends: ['plugin:cypress/recommended']
};
