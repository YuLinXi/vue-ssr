const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const VueSSRClintPlugin = require('vue-server-renderer/client-plugin');
const { resolve, } = require('./utils');

module.exports = merge(webpackBaseConfig, {
  entry: {
    app: resolve('src/entry-client.js')
  },

  output: {
    filename: "[name].[chunkhash].js"
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity
    }
  },
  plugins: [
    new VueSSRClintPlugin()
  ]
})
