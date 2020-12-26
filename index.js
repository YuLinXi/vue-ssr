const fs = require('fs');
const Koa = require('koa');
const staticFile = require('koa-static');
const { isProd } = require('./build/consts');
const { createRenderer, resolve, htmlResponse } = require('./build/common');
const setupDevServer = require('./build/setup-dev-server');

let renderer;
let onReady;

const app = new Koa();

if (isProd) {
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  const serverBundle = require('./dist/vue-ssr-server-bundle.json');
  const template = fs.readFileSync(resolve('index.template.html'), 'utf-8');
  renderer = createRenderer(serverBundle, clientManifest, template);
} else {
  onReady = setupDevServer(app, (serverBundle, clientManifest, template) => {
    renderer = createRenderer(serverBundle, clientManifest, template);
  })
}

app.use(staticFile(resolve('static')));

app.use(staticFile(__dirname));

app.use(async ctx => {
  if (!isProd) {
    await onReady;
  }
  htmlResponse(ctx, renderer);
});

app.listen(9998);
console.log(`server start at port 9998`);
