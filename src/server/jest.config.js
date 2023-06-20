module.exports = {
//   preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.js"],
  testTimeout: 10000, 
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
