module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/jest/__mocks__/styleMock.js',
    '^react$': 'preact-compat',
    '^react-dom$': 'preact-compat',
  },
};
