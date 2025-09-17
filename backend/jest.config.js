/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  testTimeout: 30000,
  // optionnel: ignore build/scripts
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};
