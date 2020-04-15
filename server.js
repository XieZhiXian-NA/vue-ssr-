const Vue = require("vue");
const exp = require("express");
const express = exp();
//服务端的渲染器
const renderer = require("vue-server-renderer").createRenderer();
const creatApp = require("./dist/bundle.server.js")["default"];

express.use("/", exp.static(__dirname + "/dist"));
//客服端bundle
const clientBundlefileUrl = "/bundle.client.js";

// const app=new Vue({
// template:'<div>Hello world</div>'
// })

express.get("/api/getHomeInfo", (req, res) => {
  res.send("ssR发送请求了");
});

express.get("*", (req, res) => {
  const context = { url: req.url };
  creatApp(context).then((app) => {
    let state = JSON.stringify(context.state);
    renderer.renderToString(app, (err, html) => {
      if (err) {
        return res.state(500).end("运行错误");
      }
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>VUE 2.0 SSR渲染页面</title>
        <script>window.__INITIAL_STATE__=${state}</script>
        <script src="${clientBundlefileUrl}"></script>
        </head>
        <body>
        ${html}
        </body>
        </html>`);
    });
  });
});

express.listen(8080, () => {
  console.log("服务器已启动");
});
