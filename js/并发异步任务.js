/* eslint-disable no-loop-func */
// 控制并发异步任务数量
// 1. 初始传入所有任务
function concurrencyEvent(arr) {
  return new Promise((resolve) => {
    const reslut = [];
    const count = arr.length;
    let endCount = 0;
    let ingCount = 0;
    const n = 5;
    const exec = () => {
      while (ingCount < n && arr.length > 0) {
        ingCount++;
        const len = arr.length;
        const asyncEvent = arr.shift();
        Promise.resolve(asyncEvent())
          .then((value) => {
            reslut[count - len] = value;
            // console.log('value', value);
            ingCount--;
            endCount++;
            if (endCount >= count) {
              resolve(reslut);
            } else {
              exec();
            }
          });
      }
    };
    exec();
  });
}

async function test() {
  const chunk = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  function sendRequest(task) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(task);
      }, Math.random() * 2000);
    });
  }
  const arr = chunk.map((num) => () => sendRequest(num));
  const res = await concurrencyEvent(arr);
  console.log('res', res);
}
test();

// 2. 初始传入并发数，可以随时添加任务

// 有两个请求，按照优先有序打印顺序打印；
//  例如： req1: 10ms、req2: 5ms； 10ms后打印出 req1、req2的结果
//  req1: 5ms、req2: 10ms； 5ms后打印出req1、再过5ms后打印出req2
function request(time) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(time); }, time);
  });
}

function sequence(arr) {
  const res = [];
  let resStartIndex = 0;

  function getRes(i) {
    for (let j = resStartIndex; j <= i; j++) {
      if (res[j] === undefined) {
        return;
      }
    }
    let endIndex = resStartIndex;
    for (; endIndex <= arr.length; endIndex++) {
      if (res[endIndex]) {
        console.log(res[endIndex]);
      } else {
        break;
      }
    }
    resStartIndex = endIndex;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].then((value) => {
      res[i] = value;
      getRes(i);
    });
  }
}
sequence([
  request(2000),
  request(500),
  request(1000),
]);

sequence([
  request(500),
  request(2000),
  request(1000),
]);

sequence([
  request(500),
  request(1000),
  request(2000),
]);
