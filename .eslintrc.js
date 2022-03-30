module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-extend-native': 0,
    'func-names': 0,
    'no-plusplus': 0,
    'no-console': 0,
  },
};
