module.exports = {
  extends: 'standard-with-typescript',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    project: './tsconfig.json'
  }
}
