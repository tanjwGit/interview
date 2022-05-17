


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
<br />

### 什么会导致内存泄漏?
<span id = "jump3.2">[跳转](#jump3.1)</span>
<br />

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





