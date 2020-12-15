const Koa = require('koa');
const Vue = require('vue');
const path = require('path');
const fs = require('fs');
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8')
});

const resolve = (src) => path.resolve(___dirname, src);
const app = new Koa();

let htmlStr = nuull;
const vueInst = new Vue({
    template: `
        <div id="app">
            <h1>{{ message }}</h1>  
        </div> 
    `,
    data: {
        message: '测试'
    }
})

renderer.renderToString(vueInst, {
    title: '测试'
},(err, html) => {
    if (err) throw err;
    htmlStr = html;
})

app.use(async ctx => {
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = htmlStr;
});

app.listen(3000);
console.log(`server start at port 3000`);
