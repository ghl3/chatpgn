// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "\\.pegjs$": "<rootDir>/pegjs_jest_transformer.js",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"],
};
