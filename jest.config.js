module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./tests/setup.js"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
