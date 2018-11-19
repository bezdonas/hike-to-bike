module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
