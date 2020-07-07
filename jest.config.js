module.exports = {
    projects: [{
        displayName: 'eslint',
        runner: 'jest-runner-eslint',
        testMatch: [
            '<rootDir>/src/**/*.js'
        ]
    }, {
        displayName: 'test',
        testMatch: [
            '<rootDir>/tests/**/*.spec.js'
        ]
    }]
};
