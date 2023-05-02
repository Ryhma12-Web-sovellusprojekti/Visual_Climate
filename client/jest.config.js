module.exports = {
  // ...
  "transform": {
    "^.+\\.js$": "babel-jest"
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!(module-that-needs-to-be-transpiled)/)"
  ],
  "testEnvironment": "jest-environment-puppeteer",
  "testMatch": [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)"
  ],
  "moduleNameMapper": {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "extensionsToTreatAsEsm": [".js"]
}
