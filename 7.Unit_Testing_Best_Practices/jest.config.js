module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'controllers/**/*.js',
        '**/*.js',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!jest.config.js'
    ],
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
};