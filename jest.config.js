module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      extends: '<rootDir>/.babelrc',
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  // testEnvironment: 'node',
  setupFilesAfterEnv: [
    "<rootDir>/testSetupFile.ts"
  ],
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|eot|ttf|woff|woff2)$": "jest-transform-stub"
  }
}
