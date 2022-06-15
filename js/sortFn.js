// 外链: https://zhuanlan.zhihu.com/p/122284534

// 生成一个乱序的一维数组
function createRandomArray(arrLength = 10) {
  return new Array(arrLength).fill(0).map(() => {
    const num = Math.floor(Math.random() * 100);
    return Math.random() > 0.5 ? num : -num;
  });
}

const randomArr = createRandomArray();
/**
 * 冒泡排序
 * 思想：冒泡排序是一种交换排序，核心是冒泡，把数组中最大的那个往上冒，冒的过程就是和他相邻的元素交换。
 * 步骤：
 * 1. 比较相邻的元素。如果后一个比前一个大，就交换它们两个
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数
 * 3. 针对所有的元素重复以上的步骤，除了最后一个；重复步骤1~3，直到排序完成
 */
Array.prototype.bubbleSort = function () {
  const arr = this;
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j + 1] < arr[j]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

console.log('冒泡排序::', [...randomArr].bubbleSort().join(' '));

// 优化1:
// 在某次遍历中如果没有数据交换，说明整个数组已经有序,但仍然还要比较O(N^2)次，但无交换次数
Array.prototype.bubbleSort1 = function () {
  const arr = this;
  const len = arr.length;
  // let numberOfExchanges = 0;

  for (let i = 0; i < len - 1; i++) {
    let exchange = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j + 1] < arr[j]) {
        exchange = true;
        // numberOfExchanges++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (!exchange) {
      break;
    }
  }

  // console.log('交换次数:', numberOfExchanges);

  return arr;
};
console.log('冒泡排序 优化1::', [-1, -3, -2, 1, 2, 3, 4, 5].bubbleSort1().join(' '));

// 优化2:
// 以下代码有问题
// 场景: 如果有100个数的数组，仅前面10个无序，后面90个都已排好序且都大于前面10个数字，那么在第一趟遍历后，最后发生交换的位置必定小于10，且这个位置之后的数据必定已经有序了
// 思路: 记录某次遍历时最后发生数据交换的位置pos，这个位置之后的数据显然已经有序了。
//       因此通过记录最后发生数据交换的位置就可以确定下次循环的范围了。由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。
// Array.prototype.bubbleSort2 = function () {
//   const arr = this;
//   let len = arr.length;

//   for (let i = 0; i < len - 1; i++) {
//     let flag = false;
//     let pos = -1;
//     for (let j = 0; j < len - 1 - i; j++) {
//       console.log(len, j);
//       if (arr[j + 1] < arr[j]) {
//         flag = true;
//         if (i === 0) {
//           pos = j + 1 + 1;
//         }

//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }

//     // if (!flag) {
//     //   break;
//     // }
//     console.log('pos', pos);
//     console.log('arr', arr.join(' '));
//     if (pos > -1) {
//       len = pos;
//     }
//   }
//   return arr;
// };
// console.log('冒泡排序 优化2::', [5, 3, 4, 1, 2, 6, 7, 8, 9, 10].bubbleSort2().join(' '));
// 3 4 1 2 5

/**
 * 选择排序
 * 思想:
 * 每次遍历出一个最小值放在最左侧
 * 每次遍历从第i项右边选出一个最小值放在第i位
*/
Array.prototype.selectSort = function () {
  const arr = this;
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
  return arr;
};
console.log('选择排序::', [...randomArr].selectSort().join(' '));

/**
 * 快速排序
 * 思想:
 * 选择一个基准值， 小的放左边， 大的放右边
 * 递归下去，直到这个数组只有一个元素，或者没有元素
*/
function quickSort(arr = []) {
  if (arr.length <= 1) {
    return arr;
  }
  const baseItem = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    const item = arr[i];
    if (item < baseItem) {
      left.push(item);
    } else {
      right.push(item);
    }
  }
  return [...quickSort(left), baseItem, ...quickSort(right)];
}

Array.prototype.quickSort = function () {
  const array = this;
  return quickSort(array);
};

/**
 * 二分排序
 * 思想:
*/
