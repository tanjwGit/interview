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
