const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const { rendererContext } = require('./consts')

const createRenderer = (serverBundle, clientManifest, template) => createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

const resolve = (file) => path.resolve(__dirname, '../', file);

const htmlResponse = (ctx, renderer) => {
  renderer.renderToString(rendererContext, (err, html) => {
    if (err) {
      ctx.throw(500, 'Internal Server Error');
      return ;
    }
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = html;
  })
}

module.exports = {
  createRenderer,
  resolve,
  htmlResponse
}
