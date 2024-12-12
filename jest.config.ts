module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ["<rootDir>/jest.config.ts"],
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
    },

};