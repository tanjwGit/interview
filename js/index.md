# js 部分
## 事件循环

 - js是一门单线程的语言，为了执行一些异步任务时不阻塞代码，以及避免等待期间的资源浪费，所以才设计了事件循环的机制;
 - 单线程指的是执行js的线程，称作主线程，其他还有一些比如网络请求的线程、定时器的线程;
 - 主线程在运行时会产生 `执行栈`，栈中的代码如果调用了异步api的话则会把事件添加到`事件队列`里，只要该异步任务有了结果便会把对应的回调放到 `任务队列` 里，当 `执行栈` 中的代码执行完毕后会去读取任务队列里的任务，放到主线程执行，当 `执行栈` 空了又会去检查，如此往复，也就是所谓的事件循环。
- 异步任务又分为 `宏任务`（比如setTimeout、setInterval）和 `微任务`（比如promise），它们分别会进入不同的队列，执行栈为空完后会优先检查微任务队列，如果有微任务的话会一次性执行完所有的微任务，然后去宏任务队列里检查，如果有则取出一个任务到主线程执行，执行完后又会去检查微任务队列，如此循环。
<!--  -->
- 设计 Loop 机制和 Task 队列是为了支持异步，解决逻辑执行阻塞主线程的问题，设计 MicroTask 队列的插队机制是为了解决高优任务尽早执行的问题。

## 预编译
#### 顺序：
  1. 语法分析
  2. 预编译
  3. 解释一行执行一行 解释执行
#### 预编译:
       现象:函数声明整体提升，变量  声明提升，赋值不提升
      imply global(暗示全局变量)如果变量未经声明就赋值，则此变量为全局对象window所有。一切声明的全局变量，全是window的属性。window是全局的域
   ##### 预编译发生在函数执行的前一刻
   ##### 预编译四步:
        ①创建AO对象(activation object活跃对象  执行期上下文(简单说就是作用域))
         AO{}
        ②找形参和变量声明，将变量和形参名作为AO的属性名，值为undefined
        ③将实参值和形参统一
        ④在函数体里找到函数声明，值赋给函数体。
预编译结束执行函数体，声明部分不在执行，赋值部分要执行。


全局的同理  生成的是GO对象，就是window对象

先生成GO在生成AO:先生成go，在执行函数的前一刻在生成AO


## 基本数据类型
基本值：直接存放在 栈 中
引用值：栈 中存放的是堆的地址，实际数据存放在 堆 中

## 运算
1. 赋值的顺序自右向左，计算的顺序自左向右（按数学来）
2. 字符串的比较，比的是 ASCII 码（七位二进制 0000000）


## 循环

while 循环是 for 循环的简化版 for( ； ； ){}，while 循环底层机制是 for 循环。

break 的标准定义是终止循环，break 必须要放在循环里面
switch, for,while 都是循环

continue(译：继续): 终止本次循环，来进行下一次的循环

## 隐式类型转换
隐式类型转换: 内部隐式调用的是显示的方法(其实是偷偷调用了内部的函数进行了转换)
发生隐式类型转换包括: isNaN () ，++，--， +/-（一元正负），+，*，% ，，&&，|| ，！，
<，>，<= ，>= ，== ，!=
1. isNaN +/-（一元正负）* / 会先隐式转 Number
2. + 一侧有字符串时，就转 String
3. && || ！:虽然返回的是表达式的值，但是判断时是使用的转换后的值判断的
4. < > <= >=: 有数字相比较的，就会隐士类型转换成数字类型, 两个字符串比较的是：ASCⅡ
5. == != 
TODO: 问题 1 == '1' 是被转为了数字，还是字符串？

Number(undefined) 为 NaN, 所以 undefined > 0 undefined < 0 undefined == 0 都为 false
6. === !== 没有类型转换

## 函数
函数名.length 是函数定义的形参的个数

## js 运行三部曲
1. 语法分析
2. 预编译: 函数声明整体提升、变量声明提升(先提升变量的声明，在提升函数的声明)
3. 解释执行

预编译发生在函数执行的前一刻
函数预编译的四部曲:
1. 创建AO、GO对象，（执行期上下文，就是理解中的作用域，函数产生的执行空间库）
2. 形参和变量的声明，将变量和形参名作为AO或GO的属性名，值为 undefined
3. 将实参值与形参统一（将实参的值赋给形参）
4. 在函数体里面找到函数声明(声明提升)


## 作用域
- [[scope]]: 每个js函数都是一个对象，其中存在一些不可访问的对象，供js引擎使用，其中[[scope]]就是作用域，存储了运行期上下文的集合；
- 作用域链: [[scope]]中存储的执行器上下文对象的集合，这个集合呈链式链接，这种链式链接称为 作用域链;
- 运行期上下文：函数执行的前一刻，会创建一个 称为 执行期上下文的内部对象。一个执行期上下文定义了一个函数运行时的环境，函数每次执行时对-应的执行上下文都是独一无二的，所以多次调用会创建多个执行上下文，函数执行完毕，执行上下文被销毁；



## 闭包
定义：闭包是指有权访问另外一个函数作用域中的变量的函数。
产生原因：在ES5中只存在两种作用域————全局作用域和函数作用
域，当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直
到找到该变量的标示符或者不在父作用域中，这就是作用域链，值得注意的是，每一个子函数都会拷贝
上级的作用域，形成一个作用域的链条

当内部函数被保存到外部时，将会生成闭包。闭包会导致原有作用域链不释放，造
成内存泄露

作用：
实现共有变量
做缓存
实现封装、属性私有化
模块化开发，防止污染全局变量

本质：闭包产生的本质就是，当前环境中存在指向父级作用域的引用
我理解的闭包：
正常来讲 每个函数在执行前都会创建一个 执行期上下文，函数执行结束，执行上下文应该被销毁。
但闭包可以在函数外访问该函数的 执行上下文
即 上下文没有在词法作用域内执行


```js
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {

    arr[i] = function () {
      document.write(i + ' ');
    }
  }
  return arr; //把 arr 返回到外部
}
var myArr = test();
for (var j = 0; j < 10; j++) {
  myArr[j]();
}
```

## 立即执行函数
<!-- 含有隐式类型转换知识 -->
```js
+function() {}()
-function() {}()
!function() {}()
1 & function() {}()
1 && function() {}()
```




## 原型
1. 定义: 原型是 function 对象的一个属性，定义了构造函数制造出的对象的公共祖先;
通过改构造函数产生的对象，可以继承该原型的属性和方法。
原型描述了一种继承关系
原型也是对象；
2. 利用原型的特点和概念，可以提取共有属性
3. 对象查看原型：隐式属性 __proto__
4. 对象查看对象的构造函数 constructor

- 对象的原型：obj.__proto__
- 构造函数的原型：Fun.prototype
- 构造函数的原型的 constructor 属性指向 构造函数: Fun.prototype.constructor = Fun

## 原型链
1. Object.create(原型) // Object || null
1. 绝大多数对象的最终都会继承自 Object.prototype


## 数组
改变原数组的方法：reverse / sort / push / pop / unshift / shift / splice
不改变原数组的方法: forEach filter map reduce  reduceRight slice concat join split toString

# 浏览器部分
## 浏览器事件处理模型
事件冒泡、事件捕获（不能同时存在）
事件冒泡：从html结构上处于嵌套关系的元素，存在事件冒泡的功能（同一个事件，自子元素向父元素冒泡）
事件捕获：从html结构上处于嵌套关系的元素，存在事件捕获的功能（同一个事件，自父元素捕获至子元素，自元素是事件源元素）

同一个对象的同一个事件类型，绑定两个事件处理，分别执行事件冒泡和事件捕获，触发顺序为 先捕获 后 冒泡

取消冒泡：event.stopPropagation(); (ie: event.cancelBubble = true;)

## 事件委托
  - 利用事件源 和 事件冒泡 进行处理
  - 减少事件注册，节省内存
  - 简化了dom节点更新时，相应事件的更新。比如不用在新添加的li上绑定click事件。当删除某个li时，不用移解绑上面的click事件

## 异步加载js
常规情况下，js加载为同步加载，会阻断 HTML\CSS加载；
1. defer 异步加载：等到dom文档全部解析（dom树生成完）完才会被执行；不阻塞页面
2. async 异步加载：加载完就执行，只能加载外部脚本；不阻塞页面
3. 创建script 标签，插入到dom中，加载完毕后callBack
4. 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性

## js加载时间线（浏览器加载时间线）
依据js出生的那一刻，记录了一系列浏览器按照顺序做的事（执行顺序）
- 从创建 document 对象 ==》 文档解析完 ==》 文档解析完加载完执行完
1. 创建 Document 对象，开始解析 web 页面，解析HTML 元素和他们的文本内容后，添加 Element 对象和Text节点到文档中，这个阶段 document.readyState = 'loading'
2. 遇到 link 外部css, 就创建线程， 进行异步加载，并继续解析文档；
3. 遇到script外部js,并且没有设置 async\defer，浏览器同步加载，并阻塞，等待js加载完并执行该脚本，然后继续解析文档；
4. 遇到script外部js, 设置有async/defer, 浏览器就创建线程异步加载，并继续解析文档；
对于async,脚本加载完后立即执行
5. 遇到img等带有src的标签，正常解析dom结构，浏览器异步加载src,并继续解析文档（看到标签直接生产dom树，不等待img加载完src）
6. 当文档解析完成（domTree建立完毕，不是加载完毕），document.readyState = 'interactive';
7. 文档解析完后，所有设置defer的脚本按照顺序执行
8. document对象触发 DOMContentLoaded 事件，标志着 程序执行从 同步脚本执行阶段，转化为 事件驱动阶段；
9. 当所有的 async 脚本加载完成并执行后， img等加载完成后（页面所有的都执行加载完之后），document.readyState = 'complete', window对象触发load事件;
10. 从此，以异步响应方式处理用户输入，网络事件等；





let arr1 = new Array(n).fill(0).map(() => new Array(n).fill(0));
let arr2 = new Array(n).fill(new Array(n).fill(0));

arr1[0] === arr1[1] // false
arr2[0] === arr2[1] // true



```js

let a = 0
let b = async () => {
  a =  await 10 + a
  console.log('2', a)
}
b()
a++
console.log('1', a)
```


```js
let a = 0
let b = async () => {
  a =  (await 10) + a
  console.log('2', a) 
}
b()
a++
console.log('1', a)  
```


```js
let a = 0
let b = async () => {
  a =  await (10 + a)
  console.log('2', a)  
}
b()
a++
console.log('1', a)  
```



### js的最大安全整数是 2^53-1超过9007199254740991的数值都不能被准确表述。  0.1+0.2 != 0.3是因为js小数部分采用 乘二取整法有循环。