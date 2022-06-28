/* eslint-disable no-shadow */

/**
 * 神策数据
 * 写一个函数实现以下数据转换：
 * {a: {b: {c:1}}, d:[1,2,[{e:3,f: 4}]]}
 * 转换成：
 * {'a.b.c': 1,  'd[0]':1, 'd[1]':2, d[2].e: 3}
 */

const obj = { a: { b: { c: 1 } }, d: [1, 2, { e: 3, f: 4 }] };
function dataConversion(object) {
  const path = [];
  const result = {};
  function conversion(obj, path) {
    if (typeof obj !== 'object' && obj !== null) {
      const key = path.join('');
      result[key.slice(1)] = obj;
    } else if (obj) {
      const isArray = Array.isArray(obj);
      Object.entries(obj).forEach(([key, value]) => {
        path.push(!isArray ? `.${key}` : `[${key}]`);
        conversion(value, path);
        path.pop();
      });
    }
  }
  conversion(object, path);
  return result;
}
dataConversion(obj);
