module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)?(x)'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
