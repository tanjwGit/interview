## 1. 如何理解HTML语义化?
  有三点: 人、搜索引擎、内容、代码结构

  1. 让人更可以读懂，增加代码的可读性；
  2. 让搜索引擎更容易读懂，有助于爬虫抓取更多信息；爬虫是依赖于标签来确定上下文和各个关键字的权重（SEO）
  3. 没有CSS样式时，页面也能呈现出内容结构、代码结构；





1.创建一个1到100数字的数组
2.forEach和map
3.promise的状态，写一个程序说输出值
4.0.1 + 0.2 不等于0.3 原因，如何解决
5.es6 set和map有什么区别
6.js中this的指向，如何改变this
7.react hooks，useState是同步还是异步，class setState异步的原因
8.concurrentMode模式
9.rn中遇到的坑，写法和touch有什么不同
10.koa和express的区别
11.怎么避免子组件每次更新，useCallback和useMemo有什么区别
12.class组件和function有什么区别




浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性


## 图片懒加载原理

仅加载视图内的图片，视图外不加载；
当图片出现在视图或者将要出现在视图时 再给src设置图片资源;
```js
let options = {
  root: document.querySelector('#root'), //目标元素的父级元素
  rootMargin: '0px', // 边距 范围
  threshold: 1.0
}
let observer = new IntersectionObserver(
  (entries, observer) => {
    // 触发两次: 一次进入，一次离开
  }, options);

let target = document.querySelector('#listItem');

// 开始观察
observer.observe(target);

// 停止对某一个的观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```