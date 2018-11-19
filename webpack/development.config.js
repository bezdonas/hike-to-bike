const baseConfig = require('./config');
const devConfig = baseConfig;
devConfig.mode = 'development';

module.exports = devConfig;
