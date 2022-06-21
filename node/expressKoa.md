  
  
### express 与 koa 的区别？
  - 编程模型
    - Koa 的中间件是U型(洋葱圈模型)的，Express的中间件是线性的
  - 语言特性
    - express 的中间件，是回调函数的形式，不能写为 异步函数
      - 如果是异步函数，不会等待异步结果,
    - 因为 回调 的问题，难以处理错误 异常;

    - express内置了许多中间件可供使用;
    - express包含路由，视图渲染等特性;
    - koa 中间件可以是 异步函数，能够正常执行;
    <!-- 而koa只有http模块; -->
    - koa通过generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise


  <!-- - 实际使用中的错误 捕获经验？
    - express
      - 在一个路由中,使用try catch 捕获
      - express 实际上不支持异步中间件，但是利用一个路由的回调内，只调用一个函数，来实现使用async await 的目的;
      - 不够优雅
    - koa
      - 在 .on('error', 以一个中间件的形式处理错误) -->


### express 与 koa 的错误处理？
  - express
    - 错误处理中间件
      - 普通中间件 3个参数 依次为`req`、`res`、`next`
      - 错误处理中间件 接收 4个参数， 依次为`error`、`req`、`res`、`next`
      - 错误处理中间件放在所有中间件的最后面
  - koa
    - 方式一
      - 因为中间件的洋葱模型，所以错误处理中间件放在第一个
      ```js
        app.use(async (ctx, next) => {
          try {
            await next();
          } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
            ctx.app.emit("error", err, ctx);
          }
        });
      ```
    - 方式二
      - 通过"错误"事件侦听器统一处理
      ```js
        app.on("error", (err, ctx) => {
          /* 错误的集中处理:
          *  log 出来
          *  写入日志
          *  写入数据库
          *   ...
          */
        });
      ```