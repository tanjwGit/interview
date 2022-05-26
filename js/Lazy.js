/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

// lazy函数可以链式调用，在调用函数的时候不会输出任何内容，当调用output时，输出前面每个函数的执行结果

class Lazy {
  constructor(num) {
    this.num = num;
    this.taskArr = [];
  }

  add = (num) => {
    this.taskArr.push(() => {
      this.num += num;
      console.log('add', this.num);
    });
    return this;
  };

  top = (fn) => {
    this.taskArr.push(() => {
      fn(this.num);
      console.log('top', this.num);
    });
    return this;
  };

  delay = (time) => {
    const fn = () => new Promise((resolve) => {
      console.log('等待');
      setTimeout(() => {
        console.log('等待结束');
        resolve();
      }, time);
    });
    this.taskArr.push(fn);
    return this;
  };

  multipy = (num) => {
    this.taskArr.push(() => {
      this.num *= num;
      console.log('multipy', this.num);
    });
    return this;
  };

  output = async () => {
    for (const fn of this.taskArr) {
      await fn();
    }
    this.taskArr = [];
  };
}

function lazy(num) {
  return new Lazy(num);
}
const lazyFun = lazy(2).add(2).delay(3000).top(console.log)
  .delay(3000)
  .multipy(3);
setTimeout(() => {
  lazyFun.output();
}, 1000);
console.log('start');
