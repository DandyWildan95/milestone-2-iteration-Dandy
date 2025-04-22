import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Polyfills for TextEncoder and TextDecoder
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Optional: Configure global settings for Testing Library
configure({ 
  asyncUtilTimeout: 3000,  // Increase timeout for async operations
  throwSuggestions: true   // Provide helpful suggestions for test improvements
});

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}

// Optional: Global mocks or setup can be added here
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});