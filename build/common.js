const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const { rendererContext } = require('./consts')

const createRenderer = (serverBundle, clientManifest, template) => createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

const resolve = (file) => path.resolve(__dirname, '../', file);

const htmlResponse = async (ctx, renderer) => {
  rendererContext.url = ctx.url;
  try {
    const html = await renderer.renderToString(rendererContext);
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = html;
  } catch (err) {
    ctx.throw(500, 'Internal Server Error');
  }
}

module.exports = {
  createRenderer,
  resolve,
  htmlResponse
}
