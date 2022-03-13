module.exports = {
    testEnvironment: 'node',
    globalSetup: './tests/shared/globalSetup.js',
    globalTeardown: './tests/shared/globalTeardown.js',
    setupFilesAfterEnv: ['./jest.setup.js'],
}