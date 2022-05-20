


### 什么是闭包？ 闭包为什么会导致
<span id = "jump1.1">[跳转](#jump1.2)</span>
<br />

### 闭包有什么作用
<span id = "jump2.1">[跳转](#jump2.2)</span>
<br />

### 什么会导致内存泄漏?
<span id = "jump3.1">[跳转](#jump3.2)</span>
<br />

### this.setState 发生了什么？
<span id = "jump4.1">[跳转](#jump4.2)</span>
<br />

### key 的作用？
<span id = "jump5.1">[跳转](#jump5.2)</span>
<br />

### 做过什么优化？做过webpack的优化没？
<span id = "jump6.1">[跳转](#jump6.2)</span>
<br />

### eventLoop?
<span id = "jump7.1">[跳转](#jump7.2)</span>
<br />

### 了解 Promise 吗？async呢？
<span id = "jump8.1">[跳转](#jump8.2)</span>
<br />

### 为什么重构? 从那些方面考虑？
<span id = "jump9.1">[跳转](#jump9.2)</span>
<br />

### 为什么选择离职？
<span id = "jump10.1">[跳转](#jump10.2)</span>
<br />

### 写组件时要考虑那些东西？
<span id = "jump11.1">[跳转](#jump11.2)</span>
<br />

### 深拷贝，浅拷贝？ 
<span id = "jump12.1">[跳转](#jump12.2)</span>
<br />

### 问代码执行，要从执行原理的层面回答，而不是照着代码读;
<span id = "jump13.1">[跳转](#jump13.2)</span>
<br />

### Promise.all，三个任务，第二个失败，第三个还会执行吗？执行，但不等待执行结果
<span id = "jump14.1">[跳转](#jump14.2)</span>
<br />

### interface 和 type 的区别;
<span id = "jump15.1">[跳转](#jump15.2)</span>
<br />

### vue-route、react-route 路由原理?
<span id = "jump16.1">[跳转](#jump16.2)</span>
<br />

### 平时是怎么学习前端的？
  - 阅读官方文档;
  - 浏览 github 仓库 内的 issues [ˈɪʃu] 以修斯: 问题、争论;
  - 看 MDN 上的解释;
  - 拜读社区内一些大佬的文章;
  - 记录总结自己遇到的一些问题;


### 实现 0.5px ?
  - 伪元素+transform
  ```css
  .scale-1px {
    position: relative;
    border: none;
  }
  .scale-1px:after {
    content: '';
    position: absolute;
    bottom: 0;
    background: #000;
    width: 100%;
    height: 1px;
    /*核心是利用transform缩放边框*/
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  ```

### css 单位？
  - em:
    - fontSize: 相对于父元素 的字体大小
    - 其他属性: 相对于自身的字体大小
  - rem:
    - 相对于根元素的字体大小, 1rem === 根元素fontSize的1倍
    - 比如 375 px, 如果需要 1rem === 10px, 
      - 那么 375px = 375/10 = 37.5rem
      - 10px = 1rem;
      - 12px = 1.2rem
    - (屏幕宽度 / 750) * 36 + 'px'
      - 在375 屏幕下, 18px
      - 1rem = 18px
      - 10px = 18 / x;  x = 1.8rem;
  - lh:
    - 相对于元素的line-height
  - vw:
    - 1vw === 视口宽度的 1%
  - vh:
    - 1vh === 视口高度的 1%
  - vmin:
    - 1vmin === 视口高度或宽度中较小值的1%
  - vmax:
    - 1vmax === 视口高度或宽度中较大值的1%
  - 百分比:
    - fontSize 设置为百分比，就是父元素fontSize 的百分比
    - width 设置为百分比，就是父元素 width 的百分比
  

### localStorage 变化能不能被监听到？
  - LocalStorage 变化时，会触发storage事件
  - 调用 window.localStorage.setItem() 更改 LocalStorage

### js 判断运行环境？ 比如浏览器、 端内webView h5、小程序？
  -  window.navigator.userAgent
    - 声明了浏览器用于 HTTP 请求的用户代理头的值，可以提取该条信息中的一些特殊地 值

### 如何做好垃圾回收?
  - 尽量少使用全局变量， 会被放入 老生代中
    - 老生代 清理垃圾时 耗时长



### ts 的好处

### interface type 
  - interface只能定义对象类型。
  - type可以声明任何类型，基础类型、联合类型、交叉类型

  - 不允许两个别名相同
  - 同名的 interface 会被合并

  - interface可以使用extends,和implements,进行扩展
  - 但type、 interface 都可以使用交叉类型&进行合并

### interface A、 interface B 继承

### 箭头函数、 普通函数的 范型定义

### ts 一些工具函数
  - Omit
    - [oʊˈmɪt] 忽略、删除
    - `Omit<T, U>` 从类型 T 中剔除 U 中的所有属性

  - Partial
    - [ˈpɑːrʃ(ə)l] 牌儿show 部分的；不完整的
    - Partial<T> 作用：将所有属性变为可选的 ?
  - Required
    - Required<T> 作用：将所有属性变为必选的
  - Record
    - ['rekɔːrd]  ruai 口 的: 记录
    - `Record<K extends keyof any, T>`  将 K 中所有的属性的值转化为 T 类型
  - Pick
    - [pɪk] 派克: 选择；挑选
    - Pick<T, K extends keyof T> 将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型

  - ReturnType
    - ReturnType<T>
    - 用于获取 函数T的返回类型。

### never ?
  - 表示永远无法达到的类型
  - 只能在两种情况下使用
    - 函数永远不会有返回值时
    - 函数永远会抛出一个错误时

### infer 关键词 ?
  - 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用






<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />



### 什么是闭包？ 闭包为什么会导致
<span id = "jump1.2">[跳转](#jump1.1)</span>
<br />




### 闭包有什么作用
<span id = "jump2.2">[跳转](#jump2.1)</span>

  - 私有变量
  - 单例模式
  - 克里化

<br />

### 什么会导致内存泄漏?
<span id = "jump3.2">[跳转](#jump3.1)</span>
<br />

- 内存泄露（Memory Leaks）：是指应用程序已经不再需要的内存，由于某种原因未返回给操作系统或者空闲内存池（Pool of Free Memory）。

- 内存泄露可能带来的问题：变慢、卡顿、高延迟
- 闭包
- 循环引用
- 全局变量引起的内存泄露
- 没有清理的 DOM 元素引用
- 被遗忘的定时器或者回调

- 如何分析？
  - Chrome内存分析工具
    - Performance
    - Memory

### this.setState 发生了什么？
<span id = "jump4.2">[跳转](#jump4.1)</span>
<br />

### key 的作用？
<span id = "jump5.2">[跳转](#jump5.1)</span>
<br />

### 做过什么优化？做过webpack的优化没？
<span id = "jump6.2">[跳转](#jump6.1)</span>
<br />

### eventLoop?
<span id = "jump7.2">[跳转](#jump7.1)</span>
<br />

### 了解 Promise 吗？async呢？
<span id = "jump8.2">[跳转](#jump8.1)</span>
<br />

### 为什么重构? 从那些方面考虑？
<span id = "jump9.2">[跳转](#jump9.1)</span>


  - 要解决的问题？
    - 代码难以阅读
    - 大量重复逻辑
    - 永远不会走到的代码
    - 一些不符合react思想的代码

  - 其他的事情？
    - 增加类型系统ts
    - 增加代码规范eslint

<br />


### 为什么选择离职？
<span id = "jump10.2">[跳转](#jump10.1)</span>
<br />

### 写组件时要考虑那些东西？
<span id = "jump11.2">[跳转](#jump11.1)</span>
  - 确定好对外的props, 不暴露无关的
  - 可维护性;
  - 与业务逻辑解耦
  - 组件文档与demo
  - 模块化
<br />

### 深拷贝，浅拷贝？ 
<span id = "jump12.2">[跳转](#jump12.1)</span>
<br />

### 问代码执行，要从执行原理的层面回答，而不是照着代码读;
<span id = "jump13.2">[跳转](#jump1.1)</span>
<br />

### Promise.all，三个任务，第二个失败，第三个还会执行吗？执行，但不等待执行结果
<span id = "jump14.2">[跳转](#jump13.1)</span>
<br />

### interface 和 type 的区别;
<span id = "jump15.2">[跳转](#jump14.1)</span>
<br />

### vue-route、react-route 路由原理?
<span id = "jump16.2">[跳转](#jump15.1)</span>
<br />



