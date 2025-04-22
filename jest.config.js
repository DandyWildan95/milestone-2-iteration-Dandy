/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^../pages/(.*)$': '<rootDir>/src/pages/$1',
    '^../api/(.*)$': '<rootDir>/src/api/$1',
    '^../types/(.*)$': '<rootDir>/src/types/$1',
    '^../components/(.*)$': '<rootDir>/src/components/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest'
  },
  testMatch: [
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx}'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@testing-library/react|@testing-library/jest-dom|react-router-dom)/)'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
