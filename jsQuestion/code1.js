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
