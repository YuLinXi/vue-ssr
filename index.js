const Koa = require('koa');
const staticFile = require('koa-static');
const Vue = require('vue');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const Router = require('koa-router');
const { resolve } = require('./build/utils');
const fs = require('fs');

const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const serverBundle = require('./dist/vue-ssr-server-bundle.json')

const template = fs.readFileSync(resolve('index.template.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

const app = new Koa();

const context = {
  title: 'vue ssr',
  metas: `
    <meta name="keyword" content="vue,ssr">
    <meta name="description" content="vue srr demo">
  `,
};
app.use(staticFile(resolve('static')));

app.use(staticFile(__dirname));

app.use(async ctx => {
  renderer.renderToString(context, (err, html) => {
    if (err) {
      // ctx.err
      ctx.throw(500, 'Internal Server Error');
      return ;
    }
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = html;
  })
});


app.listen(9999);
console.log(`server start at port 9999`);
