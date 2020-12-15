const vueLoaderPlugin = require('vue-loader/lib/plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { resolve, isProd, env } = require('./utils');

module.exports = {
    mode: env,
    output: {
        path: resolve('./dist'),
        publicPath: "/dist/",
        filename: "[name].[chunkhash].js"
    },
}
