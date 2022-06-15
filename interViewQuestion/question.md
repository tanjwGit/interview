


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
  - 拜读社区内一些大佬的系列性文章;
  - 记录总结自己遇到的一些问题;


### 实现 0.5px ?
  - 两种方案都跟dpr有关
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
  - 改变meta标签中initial-scale 为 1/dpr, 配合rem使用;
    ```html
      <meta
        name='viewport'
        content='
          width=device-width,
          initial-scale=1.0 // 改变此值
        '
      />
    ```

### css 单位？
  - em:
    - fontSize: 相对于父元素 的字体大小
    - 其他属性: 相对于自身的字体大小
  - rem:
    - 一般将 fontSize 设置为 clientWidth与设计稿宽度的比值,
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

  - localStorage.getItem()读取数据的时间是不可预测的。此外，这是一个阻塞型方法，浏览器会停止处理页面直到数据从磁盘中读出

  - 隐私模式下，不可读取;


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



### ts 的高级类型？
  - 交叉类型 &
  - 联合类型 ｜
  - 类型断言 as
  - 类型别名 type
  - 枚举成员类型
  - 索引类型 keyof
    ```ts
      interface Map<T> {
        [key: string]: T;
      }
    ```

### Required 实现？

###  unknown any 的区别？

### 如何判断类型 安全？

### useEffect useLayoutEffect 的区别？

### useEffect 可以代替 componentShouldUpdate吗？


### 哪些是微任务？哪些是宏任务？
  - 宏任务
    - setTimeout
    - setInterval
    - setImmediate
    - `<script>`标签中的运行代码
    - 事件触发的回调函数
    - I/O
    - UI 交互
    - requestAnimationFrame
  - 微任务
    - Promise
    - process.nextTick
    - MutationObserver
### 浏览器UI刷新 是在 微任务后 还是宏任务后？
  1. 执行微任务
  2. 执行渲染操作
  3. 执行宏任务


### react 现有 api 实现 redux?
  - React.createContext
    - 共享一个全局的状态
  - React.useReducer
    - 接受一个  reducer, 返回当前state,和配套的dispatch
  - useContext
    - 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
    -  缺点: 触发本组件的重渲染,  不受制于 shouldComponentUpdate
  - Context 和 useReducer 结合

    ```jsx
      // store.js
      const initState = {
        count: 0,
        text: '',
      };
      const reducer = (state, action) => {
        const { type, payload } = action;
        switch (type) {
          case 'add':
            return { ...state, count: state.count + 1 };
          case 'minus':
            return { ...state, count: state.count - 1 };
          case 'change-text':
            return { ...state, ...payload };
          default:
            return state;
        }
      };

      export const Store = createContext(null);

      const Provider = (props) => {
        const [state, dispatch] = useReducer(reducer, initState);
        return (
          <Store.Provider value={{ state, dispatch }}>
            {props.children}
          </Store.Provider>
        );
      };

      export default Provider;

    ```

    ```jsx
      // 根组件使用
      ReactDOM.render(
        <Provider>
          <App />
        </Provider>,
        document.getElementById('root')
      );
    ```

    ```jsx
      // 自组件使用
      function App() {
        const { dispatch, state } = useContext(Store);

          const add = () => {
            dispatch({ type: 'add' });
          };

        return (
          <div>
            <button onClick={add}>Add</button>
          </div>
        );
      }
    ```


### redis 存储，使用什么类型比较好？ 哈希、map、list


### 怎么实现一个购物车？


### 缓存？

### hash 的作用、加密？
  - 为了验证原始数据是否被篡改

### 传输的数据压缩？


### cookie? 识别用户


### css 定位？


### https 证书的作用？
  - 使浏览器得到可信的 服务器 公钥，并传递给服务器 自己生成的密钥;


### 编码格式？？


### 帧 与 eventLoop 的关系？

### 二进制？
  - 0b0101010101

### redis 与 mySql 的区别？
  - redis
    - 数据在内存当中
    - 数据的生命周期不宜太久
    - redis是单线程
  - mySql
    - 

### express 与 koa 的区别？



### 浏览器的 进程 与 线程？
<!-- https://juejin.cn/post/6844903553795014663 -->



### Promise.all 的实现？


### 使用正则 校验钱的千分符格式 如 1,111,222.00或1.01或100，小数点后最多两位

### ?? 与 ?. 的区别？
  - ??
    - null 或者 undefined, 就使用 ?? 后面的值


### Object 的key 的访问顺序？
 -  如： Object.keys({b:'b',a:'a', 2:2, 1:1})

### 判断类型的方式？
  - typeof
  - instanceof
  - toString: Object.prototype.toString.call

### 如何操作 cookie ? 与cookie有关的标识？

### transform 的劣势？
  - 开启GPU硬件加速，提高了性能，但是可能会增加耗电
  - 层爆炸, 可能导致产生大量不在预期内的合成层,浏览器虽然有层压缩，但也有很多无法压缩的情况；
    - 很多不需要提升为合成层的元素因为某些不当操作成为了合成层;
    - 解决层爆炸
      - 让其他元素不要和合成层元素重叠
      - 使用 3D 硬件加速提升动画性能时，最好给元素增加一个 z-index 属性，人为干扰合成的排序，可以有效减少创建不必要的合成层，提升渲染性能，移动端优化效果尤为明显


### 浏览器中实现动画的方式？
  - js canvas
  - css
    - transition 过渡
    - animation 动画 keyframes
  - js
    - setTimeout setInterval
    - requestAnimationFrame

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
    - 大量挂载在 global 上的数据

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
  - 与业务逻辑解耦;
  - 组件文档与demo;
  - 模块化;
<br />

### 写 npm 包需要考虑什么？
  - 示例代码
  - readme 或 文档说明
  - package.json
  - 版本升级间的兼容性

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

