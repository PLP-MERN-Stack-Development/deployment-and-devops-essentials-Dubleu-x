// Global test timeout
jest.setTimeout(30000);

// Global test utilities
global.console = {
  ...console,
  // uncomment to ignore specific log levels
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};