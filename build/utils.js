const path = require('path');

const resolve = (file) => path.resolve(__dirname, '../', file);
const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

module.exports = {
    resolve,
    isProd,
    env
}
