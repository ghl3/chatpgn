// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"],
};