const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

module.exports = {
  isProd,
  env,
}
