  
  
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


  - 实际使用中的错误 捕获经验？
    - express
      - 在一个路由中,使用try catch 捕获
      - express 实际上不支持异步中间件，但是利用一个路由的回调内，只调用一个函数，来实现使用async await 的目的;
      - 不够优雅
    - koa
      - 在 .on('error', 以一个中间件的形式处理错误)