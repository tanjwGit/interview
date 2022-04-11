/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-proto */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

// 本章所有函数的实现，均是考察原型链

/** * --------------- 分割线 --------------- ** */

// call 的实现
// call: 改变方法内部this的指向，指向第一个参数，后面的参数是正常传的实参
// 1. context为 null 或 undefined 时会自动替换为指向全局对象(严格模式下为 undefined)，原始值会被包装

Function.prototype.myCall = function (context, ...rest) {
  context = context === undefined || context === null ? window : Object(context);

  const fn = this;
  const key = Symbol('key');
  context[key] = fn;
  const result = context[key](...rest);
  delete context[key];
  return result;
};

// const value = Symbol();
// const value = 0;
// function a(name) {
//   console.log(this.name, name);
// }
// a.myCall(value, 3, 4);
// a.call(value, 3, 4);

/** * --------------- 分割线 --------------- ** */

// apply 的实现
// apply: 第一个参数同样是指向的对象，但实参只能传一个数组形式
// 与call 实现相同，仅参数形式不同
Function.prototype.myApply = function (context, rest) {
  context = context === undefined || context === null ? window : Object(context);

  const fn = this;
  const key = Symbol('key');
  context[key] = fn;
  const result = context[key](...rest);
  delete context[key];
  return result;
};

/** * --------------- 分割线 --------------- ** */

// bind 的实现
/**
 * 作用:
 * 1. 函数A调用时，传递参数为 o, x, y, z... 形参与call类似
 * 2. 返回一个新的函数B, 函数内部的this 指向o, 不存在时(null 或 undefined)指向 全局对象window(严格模式下为 undefined)
 * 3. 函数B在执行时，传递的参数会拼接到x,y的后面，一并在内部传递给A执行
 * 4. new B(): 即B作为构造函数时，构造函数依旧时A，A内部this指向不会发生改变，o不起任何作用
*/
Function.prototype.myBind = function (context, ...arg) {
  const oldFn = this;

  function F() {}

  const newFn = function (..._arg) {
    const target = this instanceof F ? this : context;
    // target 的处理是为了实现第四点：
    return oldFn.call(target, ...arg, ..._arg);
  };

  F.prototype = oldFn.prototype;
  newFn.prototype = new F();
  newFn.prototype.constuctor = newFn;
  newFn.prototype.uber = oldFn.prototype;
  return newFn;
};

/** * --------------- 分割线 --------------- ** */

// 圣杯模式 完美继承 inherit
function inherit(Origin, Target) {
  function F() {}
  F.prototype = Origin.prototype;
  Target.prototype = new F();
  Target.prototype.constuctor = Target;
  Target.prototype.uber = Origin.prototype;
}

/** * --------------- 分割线 --------------- ** */

// new 的实现
/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new#description
 * new 之后，函数内部会自动隐式的 添加 三段式，//为隐式自动添加的内容
 * 如:
 * function Fn() {
 * // var this = {
 *  __proto__: Fn.prototype
 * };
 * 或者 var this = Object.create(Fn.prototype)
 *
 * this.a = 1;
 *
 * // return this;
 * // 可手动return一个对象，但不能返回一个原始值，若写返回原始值，实际还是隐式的返回this
 * }
 * const obj = new Fn();
*/

function myNew(fn, ...arg) {
  if (typeof fn !== 'function' || !fn.prototype) {
    throw new Error('fn为函数，且必须为非箭头函数');
  }

  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, arg);

  if (result && ['object', 'function'].includes(typeof result)) {
    return result;
  }
  return obj;
}

// function A(count, count2) {
//     this.count = count;
//     this.count2 = count2;
//     return function() {};
// }
// ((...arg) => {
//     console.log(myNew(A, ...arg));
//     console.log(new A(...arg));
// })(1, 2);

/** * --------------- 分割线 --------------- ** */

// instanceof 的实现
// object instanceof constructor: 意思是 object 对象是不是 constructor 构造函数构造出来的；记住是：看 object 对象的原型链上有没有 constructor 的原型
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
// isPrototypeOf(object)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf
function instanceof1(obj, constructer) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  let proto = obj.__proto__;
  while (proto) {
    if (proto === constructer.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

function instanceof2(obj, constructer) {
  return constructer.prototype.isPrototypeOf(obj);
}

/** * --------------- 分割线 --------------- ** */

// create 的实现
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#syntax
Object.prototype.myCreate = function (origin, propertiesObject) {
  if (!['object', 'function'].includes(typeof origin)) {
    throw new Error('666');
  }

  function Fn() {}
  Fn.prototype = origin;
  const obj = new Fn();
  return Object.defineProperties(obj, propertiesObject || {});
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
};

// function myCreatTest() {}
// myCreatTest.prototype.age = 18;
// ((v) => {
//     console.log(Object.create(v).age);
//     console.log(Object.myCreat(v).age);
// })(myCreatTest.prototype);
