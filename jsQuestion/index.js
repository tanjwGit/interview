/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
/* eslint-disable no-self-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
/* eslint-disable no-use-before-define */

// 类型判断、作用域、this指向、原型、事件循环等
// 节选自 https://juejin.cn/post/6989433079760683022

// 第一题
function a(b = c, c = 1) {
  console.log(b, c);
}
a();

// 报错
// Uncaught ReferenceError: Cannot access 'c' before initialization
// 给函数的多个参数设置默认值，实际上跟按顺序定义变量一样，会存在暂时性死区的问题：前面定义的变量不能引用后面为定义的变量

// 第二题
const aa = bb = 10;
(function () {
  const aa = bb = 20;
}());
console.log(aa, bb);

// 输出：10 20
// 连等操作是从右向左执行
// let a = b = 10  相当于 global.b = 10; let a = b;
// 函数内 let a = b = 20 相当于 global.b = 20; let a = b;
// TODO: 复习一下 函数、变量的声明提升

// 第三题
let aaa = { n: 1 };
const bbb = aaa;
aaa.x = aaa = { n: 2 };
console.log(aaa.x, bbb.x);

// 输出：undefined { n: 2 }
// . 运算符优先级最高，所以先执行 a.x， 变成 { n: 1, x: undefined }
// 然后按照连等操作从右向左执行 a = { n: 2 }
// 然后a.x= 2, 因为a.x最开始执行过了，等价于 ({ n: 1, x: undefined }).x = a = { n: 2 }
// b 引用地址也指向({ n: 1, x: undefined })
// 所以最后: b = {n: 1, x: { n: 2 }}; a = { n: 2 }

// 第四题
console.log(1 + undefined); // NaN
console.log(1 + null); // 1
console.log(1 + {}); // '1[object Object]'
console.log(1 + []); // '1'
console.log([] + {}); // '[object Object]'

// 不同类型 + 的行为：
// 1. 有一个操作数是字符串： 另一个数也转成字符串
// 2. 有一个操作数是对象: 就调用对象的valueOf转成原始值，如果没有改方法或者调用后仍是非原始值，在调用toString方法
//    1 + {valueOf: () => 1, toString: () => '1'}: 期望结果: 2, 实际结果 2
//    1 + {valueOf: () => ({}), toString: () => '1'}: 期望结果: '11', 实际结果 '11'
// TODO: 此例子更向是把valueOf的结果Number了
// 3. 其他情况下，两个操作数都会被转成数字执行加法操作

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf#examples

// 第五题
const out = 25;
const inner = {
  out: 20,
  func() {
    const out = 30;
    return this.out;
  },
};

(inner.func, inner.func)(); // 25
inner.func(); // 20
(inner.func)(); // 20
(inner.func = inner.func)(); // 25

// 1. 逗号操作符 返回表达式中的最后一个值，即func函数本身，执行该函数（在全局调用），所以this = window
// 2. 简单，不用讲
// 3. 括号是迷惑性的，实际上(inner.func)和inner.func是完全相等的
// 4. 赋值表达式和逗号表达式类似，都是返回值本身，所以也是在全局环境调用函数

// 第六题
console.log(Object.assign([1, 2, 3], [4, 5]));
// [4, 5, 3]
// assign方法会把数组视为对象，比如这里会把目标数组视为是属性为0、1、2的对象，所以源数组的0、1属性的值覆盖了目标对象的值。

// 第七题
let x = 1;
switch (x++) {
  case 0: ++x;
  case 1: ++x;
  case 2: ++x;
}
console.log(x); // 4
// x++ 先使用，后++，所以进入 case 1,此时++， x = 2,在执行 case1 的++x,x = 3;
// 没有break语句，继续向下进入case2, 所以为4

// 第八题
const i = 1;
function ib() {
  console.log(i);
}

function ia() {
  const i = 2;
  ib();
}

ia(); // 1
// js 是词法作用域，写代码阶段已确定作用域，与执行时无关

// 第九题
function fn() {
  console.log(this);
}
const arr = [fn];
arr[0](); // arr本身
// 数组也是对象， 相当于 arr = {fn : function } => arr.fn => arr['fn']

// 第十题
function Foo() {
  getName = function () { console.log(1) }
  return this
}
Foo.getName = function () { console.log(2) }
Foo.prototype.getName = function () { console.log(3) }
var getName = function () { console.log(4) }
function getName() { console.log(5) }

//请写出以下输出结果：
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()

// 2、4、1、1、2、3、3
/**
 * Foo.getName(): 执行Foo函数的静态方法，打印出2
 * getName(): 当前getName是打印出4的那个函数
 * Foo().getName(): 修改了全局变量getName，赋值为 打印 1 的函数， 返回this, this指向window, 所以打印 1
 * getName(): 打印 1
 * new Foo.getName(): 相当于 new (Foo.getName)(), 打印 2
 * new Foo().getName(): 点运算符（.）的优先级和new是一样高的，所以从左往右执行, 相当于 (new Foo()).getName(), => {}.getName(), 对象本身没有getName， 所以到原型链上， 打印 3
 * new new Foo().getName(): 相当于 new ((new Foo()).getName)(), 所以打印 3
*/


// 第十一题
const person = {
  address: {
   country:"china",
   city:"hangzhou"
  },
  say: function () {
   console.log(`it's ${this.name}, from ${this.address.country}`)
  },
  setCountry:function (country) {
   this.address.country=country
  }
 }
 
 const p1 = Object.create(person)
 const p2 = Object.create(person)
 
 p1.name = "Matthew"
 p1.setCountry("American")
 
 p2.name = "Bob"
 p2.setCountry("England")
 
 p1.say() // it's Matthew, from England
 p2.say() // it's Bob, from England
//  Object.create方法会创建一个对象，并且将该对象的__proto__属性指向传入的对象


// 第十二题
console.log('1');

setTimeout(function() {
  console.log('2');
  process.nextTick(function() {
    console.log('3');
  });
  new Promise(function(resolve) {
    console.log('4');
    resolve();
  }).then(function() {
    console.log('5');
  });
}); 

process.nextTick(function() {
  console.log('6');
});

new Promise(function(resolve) {
  console.log('7');
  resolve();
}).then(function() {
  console.log('8');
});

setTimeout(function() {
  console.log('9');
  process.nextTick(function() {
    console.log('10');
  }) 
  new Promise(function(resolve) {
    console.log('11');
    resolve();
  }).then(function() {
    console.log('12')
  });
})

// 1、7、6、8、2、4、9、11、3、10、5、12
// TODO: 需要在好好琢磨琢磨
// node 的事件循环 与浏览器不同
// node 中宏任务分为不同的阶段
// 定时器属于timers阶段、setImmediate属于check阶段、socket的关闭事件属于close callbacks阶段、其他所有的宏任务都属于poll阶段
// 执行到某个阶段，那么会执行完该阶段所有的任务

// process.nextTick和微任务 在上述每个阶段的最后执行
// process.nextTick会优先于微任务
// https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHpicYrciafd3U8o83thyl6lpgBSlmhTCIO0wVmrK8zBUEZgbYMaCErpOhfFPRlxuJ8MGGMf7gNU1zaA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1

/**
 * 首先执行整体代码，先打印出1，setTimeout回调扔进timers队列，nextTick的扔进nextTick的队列，promise的回调是同步代码，执行后打印出7，then回调扔进微任务队列然后又是一个setTimeout回调扔进timers队列，到这里当前节点就结束了
 * 检查nextTick和微任务队列，nextTick队列有任务，执行后打印出6，微任务队列也有，打印出8，
 * 接下来按顺序检查各个阶段，check队列、close callbacks队列都没有任务，
 * 到了timers阶段，发现有两个任务，先执行第一个，打印出2，然后nextTick的扔进nextTick的队列，执行promise打印出4，then回调扔进微任务队列，再执行第二个setTimeout的回调，打印出9，然后和刚才一样，nextTick的扔进nextTick的队列，执行promise打印出11，then回调扔进微任务队列，到这里timers阶段也结束了
 * 执行nextTick队列的任务，发现又两个任务，依次执行，打印出3和10，然后检查微任务队列，也是两个任务，依次执行，打印出5和12
 * 到这里是有队列都清空了。
*/