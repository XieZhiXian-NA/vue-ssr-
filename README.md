# vue SSR渲染 

同构渲染 客户端混入到服务器端

## 服务端渲染（SSR） 

官网给出的解释：
Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。即：SSR大致的意思就是vue在客户端将标签渲染成的整个html片段的工作在服务端完成，服务端形成的html片段直接返回给客户端这个过程就叫做服务端渲染。

## 服务端渲染的优缺点

1. 服务端渲染的优点：（1）更好的SEO： 因为SPA页面的内容是通过Ajax获取，而搜索引擎爬取工具并不会等待Ajax异步完成后再抓取页面内容，所以在SPA中是抓取不到页面通过Ajax获取到的内容；而SSR是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；（2）更快的内容到达时间（首屏加载更快）： SPA会等待所有vue编译后的js文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR直接由服务端渲染好页面直接返回显示，无需等待下载js文件及再去渲染等，所以SSR有更快的内容到达时间；
2. 服务端渲染的缺点：
（1）更多的开发条件限制： 例如服务端渲染只支持beforCreate和created两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序SPA不同，服务端渲染应用程序，需要处于Node.js server运行环境；（2）更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 (high traffic) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

## vue vue-server-renderer

使用该插件的renderToString方法 将自动执行「由 bundle 创建的应用程序实例」所导出的函数（传入上下文作为参数），然后渲染它。


## 预渲染 

prerender-spa-plugin
无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。

prerender-spa-plugin这个插件依赖puppeteer操作chromium这个真正的浏览器内核对SPA跑了一遍，生成一个静态的HTML，里面是已经填好的dom节点和数据

```js
new PrerenderSPAPlugin(
    [ '/', '/about', '/contact' ],//想实现预渲染的路由
    {
        renderAfterDocumentEvent: 'render-event', //事件名
    }
)
mounted: function(){
            document.dispatchEvent(new Event('render-event'));
    },

```