module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/tests/**',
    '!jest.config.js',
    '!**/logs/**',
    '!jest.global-setup.js'
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    }
  },
  testMatch: ['**/tests/**/*.test.js'],
  forceExit: true,
  detectOpenHandles: true,
  globalSetup: './jest.global-setup.js',
  setupFilesAfterEnv: ['./tests/setup.js']
};