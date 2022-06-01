/* eslint-disable no-loop-func */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

// 发布订阅 Event
class Event {
  constructor() {
    this.events = {};
  }

  on = (eventName, fn) => {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  };

  off = (eventName, fn) => {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((_fn) => (_fn !== fn));
    }
  };

  once = (eventName, fn) => {
    const newFn = (...props) => {
      fn(...props);
      this.off(eventName, newFn);
    };
    this.on(eventName, newFn);
  };

  emit = (eventName, ...props) => {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => { fn(...props); });
    }
  };
}

// 深拷贝
function deepCode(object) {
  const map = new Map();
  const _deepCode = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      let newObj = Array.isArray(obj) ? [] : {};
      if (map.has(obj)) {
        newObj = map.get(obj);
      } else {
        map.set(obj, obj);
        Object.entries(obj).forEach(([key, value]) => {
          newObj[key] = _deepCode(value);
        });
      }

      return newObj;
    }
    return obj;
  };
  return _deepCode(object);
}

// const obj1 = {};
// const obj2 = {};
// obj1.key = obj2;
// obj2.key = obj1;
// const obj = {
//   a: obj1,
//   b: 2,
//   c: 3,
//   d: {
//     e: 4,
//     f: 5,
//     j: 6,
//     h: [7, 8, 9, { i: 10, j: [11, 12] }, { k: 13 }],
//   },
// };

// 柯里化
function curry(fn, ...arg) {
  if (arg.length >= fn.length) {
    return fn(...arg);
  }
  return (...arg1) => {
    curry(fn, ...arg, ...arg1);
  };
}

// 无限调用
function add(...arg) {
  // 闭包，把初始arg保存起来
  const fn = (...arg1) => {
    arg.concat(arg1);
    // 每次调用都把arg更改为最新的参数列列表
    return fn;
  };
  fn.toString = () => arg.reduce((sum, v) => sum + v, 0);
  return fn;
}

// 数组展开
function flat1(array, num) {
  function* _flat(arr, n) {
    if (Array.isArray(arr) && n >= 0) {
      n--;
      for (let i = 0; i < arr.length; i++) {
        yield* _flat(arr[i], n);
      }
    } else {
      yield arr;
    }
  }
  return [..._flat(array, num)];
}

function flat2(array, num) {
  return array.reduce((_arr, item) => {
    if (Array.isArray(item) && num > 0) {
      _arr.push(...flat2(item, num - 1));
    } else {
      _arr.push(item);
    }
    return _arr;
  }, []);
}

// const tree = ['a', ['b', 'c'], ['d', 'e', ['f']]];
// flat(tree, 0);

// 判断是否为子数组
// TODO

// 比较版本号大小
// TODO

// 数组转树
// TODO

// 合并两个有序数组
// TODO

// 查找两个有序数组的中位数
// TODO

// 如何实现一个 LazyMan？
// https://juejin.cn/post/6844903791188246541

class LazyMan {
  constructor(name) {
    this.name = name;
    this.eventLoop = [];
    this.ing = false;
  }

  exec = () => {
    console.log('tack', this.ing);
    if (!this.ing && this.eventLoop.length > 0) {
      const task = this.eventLoop.shift();
      this.ing = true;
      task(() => {
        this.ing = false;
        this.exec();
      });
    }
  };

  sleep(time) {
    const fn = (next) => {
      console.log(`休息${time}毫秒`);
      setTimeout(() => {
        console.log(`休息${time}毫秒结束`);
        next();
      }, time);
    };
    this.eventLoop.push(fn);
    this.exec();
    return this;
  }

  sleepFirst(time) {
    const fn = (next) => {
      console.log(`休息${time}毫秒`);
      setTimeout(() => {
        console.log(`休息${time}毫秒结束`);
        next();
      }, time);
    };
    this.eventLoop.unshift(fn);
    this.exec();
    return this;
  }

  eat = (str) => {
    const fn = (next) => {
      console.log(`吃${str}`);
      next();
    };
    this.eventLoop.push(fn);
    this.exec();
    return this;
  };
}

function eventLoop(n) {
  const list = [];
  let ingCount = 0;
  const exec = () => {
    for (let i = 0; i < n; i++) {
      if (ingCount < n && list.length > 0) {
        ingCount++;
        const task = list.shift();
        setTimeout(() => {
          ingCount--;
          exec();
        }, 0);
        // task().then(() => {
        //   ingCount--;
        //   exec();
        // });
      }
    }
  };
  return (task, num) => {
    list.push([task, num]);
    exec();
  };
}
