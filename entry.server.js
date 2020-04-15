import { createApp } from "./main";
export default (context) => {
  return new Promise((resolve, reject) => {
    const { app } = createApp();
    const { router } = app.$router;

    const { url } = context;
    const { fullPath } = router.resolve(url).route;

    if (fullPath != url) {
      return reject({ url: fullPath });
    }
    //更改路由
    router.push(url);

    router.onReady(() => {
      //获取相应路由下面的组件
      const matchedComponents = router.getMatchedComponents();
      //没有路由匹配，则返回状态码
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      //遍历路由下面的组件，如果有需要服务渲染的请求，则进行请求
      Promise.all(
        matchedComponents.map((component) => {
          if (component.serverRequest) {
            //未来各组件中如果有serverRequest 对象，判断是否需要服务端请求数据，并传入一个Store参数
            return component.serverRequest(app.$store);
          }
        })
      )
        .then(() => {
          //将数据存储到context中
          context.state = app.$store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
