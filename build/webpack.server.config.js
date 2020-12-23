const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const webpackNodeExternals = require('webpack-node-externals');
const { resolve, } = require('./utils');

module.exports = merge(webpackBaseConfig, {
  entry: resolve('src/entry-server.js'),

  target: 'node',

  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },

  externals: [
    webpackNodeExternals({
      allowlist: [/\.css$/]
    })
  ],

  plugins: [
    new VueSSRServerPlugin()
  ]
})
