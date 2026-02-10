/** @jest-config-loader ts-node */
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transformIgnorePatterns: [
    "/node_modules/(?!@faker-js/faker)/"
  ],
};

export default config;