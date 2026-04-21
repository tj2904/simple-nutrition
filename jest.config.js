const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/setup-env.ts",
    "<rootDir>/__tests__/TEST_TEMPLATES.md",
    "<rootDir>/__tests__/README.md",
    "<rootDir>/__tests__/middleware.test.ts",
    "<rootDir>/__tests__/components/dataTable.test.tsx",
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testTimeout: 10000,
};

module.exports = createJestConfig(customJestConfig);
