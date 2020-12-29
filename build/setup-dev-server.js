const fs = require('fs-extra');
const webpack = require('webpack');
const chokidar = require('chokidar');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const { resolve } = require('./common');
const webpackDevMiddleware = require('webpack-dev-middleware');
const serverConfig = require('./webpack.server.config');
const clientConfig = require('./webpack.client.config');

const templatePath = resolve('./index.template.html');
const serverBundlePath = resolve('./dist/vue-ssr-server-bundle.json');
const clientManifestPath = resolve('./dist/vue-ssr-client-manifest.json');

const setupDevServer = (app, cb) => {
  let ready;
  const onReady = new Promise(r => ready = r);

  let serverBundle,
    clientManifest,
    template;

  const update = () => {
    if (serverBundle && clientManifest && template) {
      ready();
      cb(serverBundle, clientManifest, template)
    }
  };

  // watch template
  template = fs.readFileSync(templatePath, 'utf-8');
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8');
    update();
  });

  // watch server-bundle completed
  const serverCompiler = webpack(serverConfig);
  const serverDevMiddleware = webpackDevMiddleware(serverCompiler, {
    // logLevel: 'silent',
  })
  serverCompiler.hooks.done.tap('serverCompleted', () => {
    try {
      serverBundle = JSON.parse(
        serverDevMiddleware.fileSystem.readFileSync(serverBundlePath, 'utf-8')
      )
      update();
    } catch (err) {
      throw err
    }
  })

  // watch client-bundle completed
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  clientConfig.entry.app = [
    'webpack-hot-middleware/client?quiet=true&reload=true',
    clientConfig.entry.app
  ];
  clientConfig.output.filename = '[name].js';
  const clientCompiler = webpack(clientConfig);
  const clientDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    // quiet: true,
  })
  clientCompiler.hooks.done.tap('clientCompleted', () => {
    try {
      clientManifest = JSON.parse(
        clientDevMiddleware.fileSystem.readFileSync(clientManifestPath, 'utf-8')
      )
      update();
    } catch (err) {
      throw err
    }
  })
  app.use(clientDevMiddleware);
  app.use(hotMiddleware(clientCompiler, {
    log: false
  }))

  return onReady;
}

module.exports = setupDevServer;
