module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  ignorePatterns: ['node_modules', 'assets'],
  plugins: ['prettier'],
  rules: {
    quotes: ['warn', 'single', 'avoid-escape'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
