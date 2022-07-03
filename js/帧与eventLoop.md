## EventLoop 和浏览器渲染、帧动画、空闲回调的关系
  - requestAnimationFrame
    - 执行一个动画，浏览器在下次重绘之前调用指定的回调函数更新动画
    - 运行在后台标签页时，会被暂停执行

  - requestIdleCallback
    - 浏览器空闲时期调用传入的回调函数
    - 实现在主事件循环上执行后台和低优先级工作

  - https://juejin.cn/post/6844903848981577735#heading-7
  
  1. 执行微任务
  2. requestAnimationFrame
  2. 执行渲染操作 重排重绘
  3. requestIdleCallback
  3. 执行宏任务

