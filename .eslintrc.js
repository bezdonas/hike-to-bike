module.exports = {
  extends: ['eslint:recommended', 'prettier', 'standard', 'standard-preact'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
};
