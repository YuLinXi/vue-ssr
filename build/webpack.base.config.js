const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { isProd, env } = require('./consts');
const { resolve } = require('./common');

module.exports = {
  mode: env,
  output: {
    path: resolve('dist'),
    publicPath: "/dist/",
  },
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.js', '.vue', '.json'],
  },
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf )$/i,
        use: ['file-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
}
