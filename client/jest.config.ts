export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest', 
        '^.+\\.tsx?$': 'ts-jest', 
    },
};
