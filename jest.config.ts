import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Set the test environment
  testEnvironment: 'node',

  // Set the file patterns for tests
  testMatch: [
    '**/tests/**/*.test.ts'
  ],

  // Set the verbose option
  verbose: true,

  // Set the transform configuration
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Optional: Set up any other Jest configurations as needed
  // ...

  // Optional: Set up any Jest coverage configurations as needed
  // ...
};

export default config;
