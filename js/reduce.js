/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
// 一个简单的 reduce
Array.prototype.MyReduce = function (
  fn,
  init,
) {
  const arr = this;
  let i = 0;
  let result = init === undefined ? arr[i++] : init;
  for (; i < arr.length; i++) {
    const item = arr[i];
    result = fn(init, item, i, arr);
  }
  return result;
};

// 一个简单的 支持异步的 reduce

Array.prototype.asyncReduce = async function (
  fn,
  init,
) {
  const arr = this;
  let i = 0;
  let initHasValue = init !== undefined;
  let result = initHasValue ? init : await Promise.resolve(arr[i++]);
  // eslint-disable-next-line no-restricted-syntax
  for (const task of arr) {
    if (!initHasValue) {
      initHasValue = true;
      continue;
    }
    const item = await Promise.resolve(task);
    result = await fn(result, item, i++, arr);
  }
  return result;
};

// 验证

function cb(res, item, index) {
  console.log(index);
  return res + item;
}
const arr = [1, 2, 3, 4];
console.log('初始值存在:', arr.reduce(cb, 0));
console.log('初始值存在:', arr.MyReduce(cb, 0));
console.log('初始值不存在:', arr.reduce(cb));
console.log('初始值不存在:', arr.MyReduce(cb));

const asyncArr = [
  1,
  2,
  Promise.resolve(3),
  new Promise((resolve) => { resolve(4); }),
];
const asas = async () => {
  console.log('初始值存在:', await asyncArr.asyncReduce(cb, 0));
  console.log('初始值不存在:', await asyncArr.asyncReduce(cb));
  console.log(await Promise.all(asyncArr));
};
asas();
