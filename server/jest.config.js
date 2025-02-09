export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testTimeout: 10000,
  moduleFileExtensions: ['js', 'json', 'node'],
};