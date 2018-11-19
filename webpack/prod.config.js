const baseConfig = require('./config');
const prodConfig = baseConfig;
prodConfig.mode = 'production';

module.exports = prodConfig;
