const fs = require('fs-extra');
const webpack = require('webpack');
const chokidar = require('chokidar');
const { resolve } = require('./common');
const webpackDevMiddleware = require('webpack-dev-middleware');
const serverConfig = require('./webpack.server.config');
const clientConfig = require('./webpack.client.config');

const templatePath = resolve('./index.template.html');
const serverBundlePath = resolve('./dist/vue-ssr-server-bundle.json');
const clientManifestPath = resolve('./dist/vue-ssr-client-manifest.json');

const expressTransformToKoaMiddleware = () => {

}

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
  const clientCompiler = webpack(clientConfig);
  const clientDevMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    // logLevel: 'silent',
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

  app.use(async (ctx, next) => {
    return new Promise((resolve) => {
      clientDevMiddleware(ctx.req, ctx.res, resolve);
    }).then(next);
  });

  return onReady;
}

module.exports = setupDevServer;
