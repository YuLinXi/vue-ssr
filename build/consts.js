const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

const rendererContext = {
  title: 'vue ssr',
  metas: `
    <meta name="keyword" content="vue,ssr">
    <meta name="description" content="vue srr demo">
  `,
};

module.exports = {
  isProd,
  env,
  rendererContext
}
