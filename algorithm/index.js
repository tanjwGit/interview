/* eslint-disable prefer-destructuring */
/* eslint-disable max-classes-per-file */
/* eslint-disable consistent-return */
/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
}

class Stack {
  constructor() {
    this.arr = [];
    this.length = 0;
  }

  push = (item) => {
    this.length += 1;
    return this.arr.push(item);
  };

  pop = () => {
    this.length = this.length - 1 <= 0 ? 0 : this.length - 1;
    return this.arr.pop();
  };

  getTop = () => this.arr[this.length - 1];
}

function getLeftBorder(array, target) {
  let leftBorderIndex = 0;
  let rightBorderIndex = array.length - 1;

  let borderIndex = -1;

  while (leftBorderIndex <= rightBorderIndex) {
    const middleIndex = leftBorderIndex + Math.floor((rightBorderIndex - leftBorderIndex) / 2);
    const middleItem = array[middleIndex];

    if (middleItem > target) {
      rightBorderIndex = middleIndex - 1;
      borderIndex = middleIndex;
    } else if (middleItem === target) {
      rightBorderIndex = middleIndex - 1;
      borderIndex = middleIndex;
    } else if (middleItem < target) {
      leftBorderIndex = middleIndex + 1;
    }
  }
  return borderIndex;
}

function getRightBorder(array, target) {
  let leftBorderIndex = 0;
  let rightBorderIndex = array.length - 1;

  let borderIndex = -1;
  while (leftBorderIndex <= rightBorderIndex) {
    const middleIndex = leftBorderIndex + Math.floor((rightBorderIndex - leftBorderIndex) / 2);
    const middleItem = array[middleIndex];

    if (middleItem > target) {
      rightBorderIndex = middleIndex - 1;
    } else if (middleItem === target) {
      leftBorderIndex = middleIndex + 1;
      borderIndex = middleIndex;
    } else if (middleItem < target) {
      leftBorderIndex = middleIndex + 1;
      borderIndex = middleIndex;
    }
  }
  return borderIndex;
}

function searchRange(array, target) {
  const leftIndex = getLeftBorder(array, target);
  const rightIndex = getRightBorder(array, target);

  console.log(leftIndex, rightIndex);
  if (leftIndex === -1 || rightIndex === -1) {
    return [-1, -1];
  } if (rightIndex - leftIndex >= 0) {
    return [leftIndex, rightIndex];
  }
  return [-1, -1];
}

function pivotIndex(nums) {
  const sums = nums.reduce((sum, item) => sum + item, 0);
  let leftSum = 0;
  let index = -1;
  for (let i = 0; i < nums.length; i++) {
    const rightSum = sums - leftSum - nums[i];
    if (leftSum === rightSum) {
      index = i;
      break;
    } else if (leftSum < rightSum) {
      leftSum += nums[i];
    } else if (leftSum > rightSum) {
      leftSum += nums[i];
    }
  }
  return index;
}

function sortedSquares(nums) {
  const result = [];
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const leftNum = nums[left] * nums[left];
    const rightNum = nums[right] * nums[right];
    if (leftNum < rightNum) {
      result.unshift(rightNum);
      right--;
    } else if (leftNum === rightNum) {
      result.unshift(leftNum, rightNum);
      right--;
      left++;
    } else {
      result.unshift(leftNum);
      left++;
    }
  }
  return result;
}

function minSubArrayLen(s, nums) {
  let result = 0;

  let i = 0;
  let j = 0;
  let sum = 0;

  for (; j < nums.length; j++) {
    sum += nums[j];

    while (sum >= s) {
      result = Math.min(j - i + 1, result);
      sum -= nums[i];
      i++;
    }
  }
  return result;
}

// 59.螺旋矩阵II
function generateMatrix(n) {
  const arr = new Array(n).fill(0).map(() => ([]));
  let loop = Math.floor(n / 2);
  let startX = 0;
  let startY = 0;
  let endIndex = n - 1;
  let num = 1;
  while (loop > 0) {
    let i = startX;
    let j = startY;
    // i 和 j 此时是下标
    // endIndex 是 这条边 能填充的最末尾的下标

    for (; i < endIndex; i++) {
      arr[j][i] = num++;
    }

    for (; j < endIndex; j++) {
      arr[j][i] = num++;
    }

    for (; i > startX; i--) {
      arr[j][i] = num++;
    }

    for (; j > startY; j--) {
      arr[j][i] = num++;
    }
    loop--;
    endIndex--;
    startX++;
    startY++;
  }
  if (n % 2 !== 0) {
    const middleIndex = Math.floor(n / 2);
    arr[middleIndex][middleIndex] = num;
  }
  return arr;
}

function ListNode(val, next) {
  return {
    val,
    next: next || null,
  };
}

function removeElements(head, val) {
  const vHead = new ListNode(Symbol('head'), head);
  let currentNode = vHead;
  while (currentNode.next) {
    const nextNode = currentNode.next;
    if (nextNode.val === val) {
      currentNode.next = nextNode.next;
    } else {
      currentNode = nextNode;
    }
  }
  return vHead.next;
}

function MyLinkedList() {
  this.length = 0;
  this.vHead = new ListNode(Symbol('head'), null);
}

MyLinkedList.prototype.get = function (nodeIndex) {
  let index = nodeIndex;
  if (index < 0 || index > this.length - 1) {
    return -1;
  }
  let currentNode = this.vHead.next;
  while (index) {
    index--;
    currentNode = currentNode.next;
  }
  return currentNode.val;
};

MyLinkedList.prototype.addAtHead = function (val) {
  const head = this.vHead.next;
  const newHead = new ListNode(val, head);
  this.vHead.next = newHead;
  this.length += 1;
};

MyLinkedList.prototype.addAtTail = function (val) {
  let currentNode = this.vHead;
  while (currentNode.next) {
    currentNode = currentNode.next;
  }
  currentNode.next = new ListNode(val, null);
  this.length += 1;
};

MyLinkedList.prototype.addAtIndex = function (nodeIndex, val) {
  let index = nodeIndex;
  if (index > this.length) {
    return;
  }
  if (index < 0) {
    index = 0;
  }
  let currentNode = this.vHead;
  while (index && currentNode.next) {
    index--;
    currentNode = currentNode.next;
  }
  const { next } = currentNode;
  currentNode.next = new ListNode(val, next);
  this.length += 1;
};

MyLinkedList.prototype.deleteAtIndex = function (nodeIndex) {
  let index = nodeIndex;
  if (index < 0 || index > this.length - 1) {
    return;
  }
  let currentNode = this.vHead;
  while (index) {
    index--;
    currentNode = currentNode.next;
  }
  currentNode.next = currentNode.next.next;
  this.length -= 1;
};

// 属于双指针
function reverseList(head) {
  let currentNode = head;
  let prevNode = null;

  while (currentNode) {
    const nextNode = currentNode.next;
    currentNode.next = prevNode;
    prevNode = currentNode;
    currentNode = nextNode;
  }
  return prevNode;
}

function reverseListV2(head) {
  function reverse(prevNode, currentNode) {
    if (!currentNode) {
      return prevNode;
    }
    const { next } = currentNode;
    currentNode.next = prevNode;
    return reverse(currentNode, next);
  }
  return reverse(null, head);
}

function swapPairs(head) {
  const vhead = new ListNode(0, head);
  let currentNode = vhead;
  while (currentNode.next && currentNode.next.next) {
    const node3 = currentNode.next.next.next;
    const node2 = currentNode.next.next;
    const node1 = currentNode.next;

    currentNode.next = node2;
    currentNode.next.next = node1;
    currentNode.next.next.next = node3;

    currentNode = currentNode.next.next;
  }
  return vhead.next;
}

// 快慢指针
function removeNthFromEnd(head, n) {
  const vhead = new ListNode(0, head);
  let fastNode = vhead;
  let slowNode = vhead;

  while (n >= 0) {
    fastNode = fastNode.next;
    n--;
  }
  while (fastNode) {
    fastNode = fastNode.next;
    slowNode = slowNode.next;
  }

  if (slowNode.next) {
    slowNode.next = slowNode.next.next;
  }
  return vhead.next;
}

function getIntersectionNode(head1, head2) {
  function getLinkLength(head) {
    let len = 0;
    let currentNode = head;
    while (currentNode) {
      currentNode = currentNode.next;
      len++;
    }
    return len;
  }
  let len1 = getLinkLength(head1);
  let len2 = getLinkLength(head2);
  let currentNodeA = head1;
  let currentNodeB = head2;
  if (len1 < len2) {
    [len1, len2] = [len2, len1];
    [currentNodeA, currentNodeB] = [currentNodeB, currentNodeA];
  }
  let n = len1 - len2;
  while (n) {
    n--;
    currentNodeA = currentNodeA.next;
  }

  let node = null;

  while (currentNodeA && currentNodeB) {
    if (currentNodeA !== currentNodeB) {
      currentNodeA = currentNodeA.next;
      currentNodeB = currentNodeB.next;
    } else {
      node = currentNodeA;
      break;
    }
  }

  return node;
}

function detectCycle(head) {
  let fastNode = head;
  let slowNode = head;

  while (fastNode && fastNode.next) {
    fastNode = fastNode.next.next;
    slowNode = slowNode.next;
    if (fastNode === slowNode) {
      let currentNodeA = fastNode;
      let currentNodeB = head;
      let index = -1;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (currentNodeA === currentNodeB) {
          break;
        }
        index++;
        currentNodeB = currentNodeB.next;
        currentNodeA = currentNodeA.next;
      }
      return currentNodeA;
    }
  }
  return null;
}

// 2x + 2y = x + n(y + z) + y
// x = n(y + z) - y
// x = （n - 1）（y + z） + z
// 当 n = 1;
// x = z;

function isAnagram(s, t) {
  const map = {};
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const item = s[i];
    if (map[item]) {
      map[item]++;
    } else {
      map[item] = 1;
    }
  }
  for (let i = 0; i < t.len; i++) {
    const item = t[i];
    if (!map[item] || map[item] === 0) {
      return false;
    }
    map[item]--;
  }
  return true;
}

function intersection(arr1, arr2) {
  const set1 = new Set[arr1]();
  const set2 = arr2.reduce((set, item) => {
    if (set1.has(item)) {
      set.add(item);
    }
    return set;
  }, new Set([]));
  return [...set2];
}

function isHappy(num) {
  const map = {};
  let sum = num;
  while (sum !== 1) {
    if (map[sum]) {
      return false;
    }
    map[sum] = true;

    let higt = sum;
    let _sum = 0;
    while (higt !== 0) {
      const low = higt % 10;
      higt = Math.floor(higt / 10);

      _sum += low * low;
    }
    sum = _sum;
  }
  return true;
}

function twoSum(nums, target) {
  const map = nums.reduce((obj, item, index) => {
    obj[item] = index;
    return obj;
  }, {});

  for (let i = 0; i < nums.length; i++) {
    const n = target - nums[i];
    if (map[n] >= 0 && map[n] !== i) {
      return [map[n], i];
    }
  }
  return [-1, -1];
}

function fourSumCount(nums1, nums2, nums3, nums4) {
  const map = {};
  nums1.forEach((a) => {
    nums2.forEach((b) => {
      const c = a + b;
      if (map[c]) {
        map[c]++;
      } else {
        map[c] = 1;
      }
    });
  });
  let count = 0;
  nums3.forEach((a) => {
    nums4.forEach((b) => {
      const c = 0 - a - b;
      if (map[c]) {
        count += map[c];
      }
    });
  });
  return count;
}

function canConstruct(s, t) {
  const map = {};
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const item = s[i];
    if (map[item]) {
      map[item]++;
    } else {
      map[item] = 1;
    }
  }
  for (let i = 0; i < t.len; i++) {
    const item = t[i];
    if (!map[item] || map[item] === 0) {
      return false;
    }
    map[item]--;
  }
  return true;
}

function threeSum(nums) {
  const arr = nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = arr.length - 1;
    const a = arr[i];
    while (left < right) {
      const b = arr[left];
      const c = arr[right];

      if (a + b + c === 0) {
        result.push([a, b, c]);
        left++;
        while (left < right && arr[left] === arr[left - 1]) {
          left++;
        }
        right--;
        while (left < right && arr[right] === arr[right + 1]) {
          right--;
        }
      } else if (a + b + c < 0) {
        left++;
        while (left < right && arr[left] === arr[left - 1]) {
          left++;
        }
      } else if (a + b + c > 0) {
        right--;
        while (left < right && arr[right] === arr[right + 1]) {
          right--;
        }
      }
    }
  }
  return result;
}

function fourSum(nums, target) {
  const arr = nums.sort((a, b) => a - b);
  const result = [];

  for (let k = 0; k < arr.length; k++) {
    if (k !== 0 && arr[k] === arr[k - 1]) {
      continue;
    }

    for (let i = k + 1; i < arr.length; i++) {
      if (i !== (k + 1) && arr[i] === arr[i - 1]) {
        continue;
      }

      let left = i + 1;
      let right = arr.length - 1;
      while (left < right) {
        const a = arr[k];
        const b = arr[i];
        const c = arr[left];
        const d = arr[right];
        const sum = a + b + c + d;
        if (a + b === target - c - d) {
          result.push([a, b, c, d]);
          left++;
          right--;

          while (left < right && arr[left] === arr[left - 1]) {
            left++;
          }

          while (left < right && arr[right] === arr[right + 1]) {
            right--;
          }
        } else if (a + b > target - c - d) {
          right--;
          while (left < right && arr[right] === arr[right + 1]) {
            right--;
          }
        } else if (a + b < target - c - d) {
          left++;
          while (left < right && arr[left] === arr[left - 1]) {
            left++;
          }
        }
      }
    }
  }
  return result;
}

function reverseString(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    [str[left], str[right]] = [str[right], str[left]];
    left++;
    right--;
  }
  return str;
}

function reverseStr(str, k) {
  const len = str.length;
  str = str.split('');
  for (let i = 0; i < len; i += k * 2) {
    let left = i;
    const end = i + k;
    let right = (end > len ? len : end) - 1;
    while (left < right) {
      [str[left], str[right]] = [str[right], str[left]];
      left++;
      right--;
    }
  }
  return str.join('');
}

function replaceSpace(str) {
  let count = 0;
  str = str.split('');
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      count += 2;
    }
  }
  let fastIndex = str.length - 1;
  let slowIndex = str.length + count - 1;

  while (fastIndex >= 0) {
    if (str[fastIndex] !== ' ') {
      str[slowIndex] = str[fastIndex];
      slowIndex--;
      fastIndex--;
    } else {
      fastIndex--;
      str[slowIndex] = ['0'];
      str[slowIndex - 1] = ['2'];
      str[slowIndex - 2] = ['%'];
      slowIndex -= 3;
    }
  }
  return str.join();
}

function reverseWords(str) {
  function remove(arr) {
    let fastIndex = 0;
    let slowIndex = 0;

    let right = arr.length - 1;
    while (arr[fastIndex] === ' ') {
      fastIndex++;
    }

    while (arr[right] === ' ') {
      right--;
    }

    for (; fastIndex <= right; fastIndex++) {
      if (arr[fastIndex] === ' ' && arr[fastIndex - 1] === ' ') {

      } else {
        arr[slowIndex] = arr[fastIndex];
        slowIndex++;
      }
    }
    arr.length = slowIndex;
    return arr;
  }

  function reverse(arr, left = 0, right = undefined) {
    if (right === undefined) {
      right = arr.length - 1;
    }
    while (left < right) {
      [arr[right], arr[left]] = [arr[left], arr[right]];
      left++;
      right--;
    }
    return arr;
  }

  let arr = str.split('');
  arr = remove(arr);
  reverse(arr);

  let startIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i - 1] === ' ') {
      startIndex = i;
    } else if (arr[i] === ' ') {
      reverse(arr, startIndex, i - 1);
    } else if (i === arr.length - 1) {
      reverse(arr, startIndex, i);
    }
  }
  return arr.join('');
}

function reverseLeftWords(str, k) {
  function reverse(arr, left = 0, right = undefined) {
    if (right === undefined) {
      right = arr.length - 1;
    }
    while (left < right) {
      [arr[right], arr[left]] = [arr[left], arr[right]];
      left++;
      right--;
    }
    return arr;
  }

  const arr = str.split('');
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  reverse(arr, 0, arr.length - 1);
  return arr.join('');
}

// https://www.programmercarl.com/0028.%E5%AE%9E%E7%8E%B0strStr.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC

function strStr(haystack, needle) {
  function getNext(next = [], s = '') {
    // 计算前缀表， 其实也是 next数组
    let j = 0;
    next[0] = 0;

    for (let i = 1; i < s.length; i++) {
      while (j > 0 && s[i] !== s[j]) {
        j = next[j - 1];
      }

      if (s[i] === s[j]) {
        j++;
      }
      next[i] = j;
    }
    return next;
  }

  if (needle.length === 0) {
    return 0;
  }

  const next = getNext([], needle);

  for (let i = 0, j = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1];
    }

    if (haystack[i] === needle[j]) {
      j++;
    }

    if (j === needle.length) {
      return i - j + 1;
    }
  }
  return -1;
}

//  回溯
function combine(n, k) {
  const result = [];
  const path = [];
  function backtracking(startIndex, n, k) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    for (let i = startIndex; i <= n - k + path.length + 1; i++) {
      path.push(i);
      backtracking(i + 1, n, k);
      path.pop();
    }
  }
  backtracking(1, n, k);
  return result;
}

function combinationSum3(n, k) {
  const result = [];
  const path = [];
  let sum = 0;
  function backtracking(startIndex, n, k) {
    if (sum > n) {
      return;
    }
    if (path.length === k) {
      if (sum === n) {
        result.push([...path]);
      }
      return;
    }

    for (let i = startIndex; i <= 9 - k + path.length + 1; i++) {
      sum += i;
      path.push(i);
      backtracking(i + 1, n, k);
      sum -= i;
      path.pop(i);
    }
  }
  backtracking(1, n, k);
  return result;
}

// 17.电话号码的字母组合
function letterCombinations(str) {
  const map = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  };
  const arr = str.split('');
  const k = str.length;

  const result = [];
  const path = [];

  function backtracking(startIndex, n, k) {
    // n 数字字符串 k 个数
    if (path.length === k) {
      if (path.length > 0) {
        result.push(path.join(''));
      }

      return;
    }
    const currentNumber = n[startIndex];
    const strArr = map[currentNumber];

    if (!strArr) {
      return;
    }

    for (let i = 0; i < strArr.length; i++) {
      path.push(strArr[i]);
      backtracking(startIndex + 1, n, k);
      path.pop();
    }
  }
  backtracking(0, arr, k);
  return result;
}

// 239. 滑动窗口最大值
function maxSlidingWindow(nums, k) {
  class Queue {
    list = [];

    pop = (num) => {
      const item = this.list[0];
      if (num === item) {
        this.list.shift();
      }
    };

    push = (num) => {
      while (this.list[this.list.length - 1] < num) {
        this.list.pop();
      }
      this.list.push(num);
    };

    max = () => this.list[0];
  }
  const queue = new Queue();
  const result = [];
  for (let i = 0; i < k; i++) {
    queue.push(nums[i]);
  }

  result.push(queue.max());
  for (let i = k; i < nums.length; i++) {
    queue.pop(nums[i - k]);
    queue.push(nums[i]);
    result.push(queue.max());
  }
  return result;
}

// 1047. 删除字符串中的所有相邻重复项
function removeDuplicates(str) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const item = stack[stack.length - 1];
    if (item === str[i]) {
      stack.pop();
    } else {
      stack.push(str[i]);
    }
  }
  return stack.join('');
}

// 迭代法遍历 中序
function inorderTraversal(node) {
  const stack = node ? [node] : [];
  const symbol = Symbol('key');
  const reslut = [];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node !== symbol) {
      if (node.right) {
        stack.push(node.right);
      }

      stack.push(node, symbol);

      if (node.left) {
        stack.push(node.left);
      }
    } else {
      const _node = stack.pop();
      reslut.push(_node.val);
    }
  }
  return reslut;
}

// 226.翻转二叉树
function invertTree(node) {
  if (!node) {
    return;
  }
  [node.left, node.right] = [node.right, node.left];
  invertTree(node.left);
  invertTree(node.right);
  return node;
}

// 101. 对称二叉树
function isSymmetric(root) {
  // 递归形式
  // 思路: 把根节点的左右子树 看作两棵树
  // 比较 左树的左节点 与 右树的 右节点
  // 左树的右节点 与 右树的 左节点
  // 是否相等

  function compare(leftNode, rightNode) {
    if (!leftNode && rightNode) {
      return false;
    } if (leftNode && !rightNode) {
      return false;
    } if (!leftNode && !rightNode) {
      return true;
    } if (leftNode.val !== rightNode.val) {
      return false;
    }
    const leftIsSame = compare(leftNode.left, rightNode.right);
    const rightIsSame = compare(leftNode.right, rightNode.left);
    return leftIsSame && rightIsSame;
  }

  if (!root) { return true; }
  const leftNode = root.left;
  const rightNode = root.right;
  return compare(leftNode, rightNode);
}

function isSymmetricV2(root) {
  // 队列的形式 栈也可以，本质是一样的 只是 先序 和 后序 的区别
  const queue = root ? [root.left, root.right] : [];

  while (queue.length > 0) {
    const leftNode = queue.shift();
    const rightNode = queue.shift();
    if (!leftNode && rightNode) {
      return false;
    } if (leftNode && !rightNode) {
      return false;
    } if (!leftNode && !rightNode) {
      // return true;
      continue;
    } else if (leftNode.val !== rightNode.val) {
      return false;
    } else {
      // 都存在，且val相等
      queue.push(leftNode.left, rightNode.right);
      queue.push(leftNode.right, rightNode.left);
    }
  }
  return true;
}

// 100.相同的树
function isSameTree(p, q) {
  // 递归法
  function compare(left, right) {
    if (left && !right) {
      return false;
    } if (!left && right) {
      return false;
    } if (!left && !right) {
      return true;
    } if (left.val !== right.val) {
      return false;
    }
    return compare(left.left, right.left) && compare(left.right, right.right);
  }

  return compare(p, q);
}

function isSameTreeV2(p, q) {
  // 队列
  const queue = [p, q];

  while (queue.length) {
    const node1 = queue.pop();
    const node2 = queue.pop();

    if (!node1 && !node2) {
      continue;
    } else if (node1 && !node2) {
      return false;
    } else if (!node1 && node2) {
      return false;
    } else if (node1.val !== node2.val) {
      return false;
    } else {
      queue.push(node1.left);
      queue.push(node2.left);
      queue.push(node1.right);
      queue.push(node2.right);
    }
  }
  return true;
}

// 104.二叉树的最大深度
function maxDepth(root) {
  // 前序遍历 回溯 求深度

  function getDepth(node, depth) {
    const leftNode = node.left;
    const rightNode = node.right;
    if (!leftNode && !rightNode) {
      result = Math.max(result, depth);
      return;
    }
    if (leftNode) {
      depth++;
      getDepth(leftNode, depth);
      depth--;
    }
    if (rightNode) {
      depth++;
      getDepth(rightNode, depth);
      depth--;
    }
  }

  if (!root) {
    return 0;
  }
  let result = 1;
  getDepth(root, result);
  return result;
}

function maxDepthV2(root) {
  // 后序遍历 求根节点的高度
  function getDepth(node) {
    if (!node) {
      return 0;
    }
    const leftNodeDepth = getDepth(node.left);
    const rightNodeDepth = getDepth(node.right);
    const maxDepth = Math.max(leftNodeDepth, rightNodeDepth);
    return maxDepth + 1;
  }
  return getDepth(root);
}

function maxDepthV3(root) {
  // 层序遍历
  // 最大层数
}

// 111.二叉树的最小深度
function minDepth(root) {
  // 先序遍历 求深度 回溯

  function getMindepth(node, depth) {
    const { left } = node;
    const { right } = node;
    if (!left && !right) {
      result = Math.min(result, depth);
      return;
    }
    if (left) {
      depth++;
      getMindepth(left, depth);
      depth--;
    }

    if (right) {
      depth++;
      getMindepth(right, depth);
      depth--;
    }
  }

  if (!root) {
    return 0;
  }
  let result = Infinity;
  getMindepth(root, 1);
  return result;
}

function minDepthV2(root) {
  // 后续遍历
  // 返回所有的路径，选出一个小的

  function getDepth(node) {
    if (!node) {
      return 0;
    }
    const { left } = node;
    const { right } = node;

    const leftDepth = getDepth(left);
    const rightDepth = getDepth(right);

    if (!leftDepth) {
      return rightDepth + 1;
    }
    if (!rightDepth) {
      return leftDepth + 1;
    }

    const depth = Math.min(leftDepth, rightDepth);
    return depth + 1;
  }
  return getDepth(root);
}

function minDepthV3(root) {
  // 层序遍历
  // 某个节点的左右节点都不存在 此时就是最小层数
}

// 222.完全二叉树的节点个数

function countNodes(node) {
  // 普通二叉树
  // 任意形式遍历 整个树即可
}

function countNodesV2(node) {
  // 利用完全二叉树性质
  // - 满二叉树
  // - 最后一层叶子节点没有满
  // 完全二叉树一定可以分为 若干个 满二叉树
  // 满二叉树的节点个数为 2 ** 层数 - 1;
  // 所以可以分解为 n个满二叉树的节点个数相加
  // 那么如何判断是满二叉树？

  // 从一个节点开始算 左子树的深度 右子树的深度
  // 相等则为满二叉树
  // 不相等 把左右节点 分为作为根节点 求是否时满二叉树，递归下去，以及加上本节点的个数，即 + 1

  if (!node) {
    return 0;
  }
  let { left } = node;
  let { right } = node;

  let leftDepth = 1;
  while (left) {
    leftDepth++;
    left = left.left;
  }

  let rightDepth = 1;
  while (right) {
    rightDepth++;
    right = right.right;
  }

  if (leftDepth === rightDepth) {
    return 2 ** leftDepth - 1;
    // 2 << n === 2 ** (n + 1)
  }

  // return 1 + countNodesV2(left) + countNodesV2(right);
  // 注意，此时 left 已经是叶子节点了, 应该使用 node.left
  return 1 + countNodesV2(node.left) + countNodesV2(node.right);
}

// 110.平衡二叉树
function isBalanced(root) {
  // 高度平衡二叉树定义为：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1

  // 所以  求每个节点 在左右子树上的高度
  // 并且 需要比较 每个节点需要比较 两颗子树的高度

  // 而不是 只比较根节点
  // 后序遍历
  // 比较高度的差值

  // 以 - 1 表示 差值大于1
  // 如果不等于 -1， 则返回 高度，让上层计算

  function getHeight(node) {
    if (!node) {
      return 0;
    }
    const { left } = node;
    const { right } = node;

    const lefHeight = getHeight(left);

    if (lefHeight === -1) {
      return -1;
    }

    const rightHeight = getHeight(right);

    if (rightHeight === -1) {
      return -1;
    }

    return (Math.abs(lefHeight - rightHeight) > 1) ? -1 : Math.max(lefHeight, rightHeight) + 1;
  }

  if (!root) {
    return true;
  }

  return getHeight(root) !== -1;
}

// 257. 二叉树的所有路径

function binaryTreePaths(root) {
  // 典型 前序遍历 的回溯问题
  // 只有左右子节点都不存在，说明才到叶子节点

  function getPath(node, path) {
    path.push(node.val);
    const { left } = node;
    const { right } = node;

    if (!left && !right) {
      if (path.length > 0) {
        result.push(path.join('->'));
      }
      return;
    }

    if (left) {
      getPath(left, path);
      path.pop();
    }

    if (right) {
      getPath(right, path);
      path.pop();
    }
  }

  let result = [];
  const path = [];
  getPath(root, path);
  return result;
}

// 404.左叶子之和
function sumOfLeftLeaves(root) {
  // 递归
  function isLeftLeaves(node) {
    if (!node) {
      return;
    }
    const { left } = node;
    const { right } = node;

    if (left && !left.left && !left.right) {
      result += left.val;
    }

    if (left) {
      isLeftLeaves(left);
    }
    if (right) {
      isLeftLeaves(right);
    }
  }
  let result = 0;
  if (root) {
    isLeftLeaves(root);
  }
  return result;
}

function sumOfLeftLeavesV2(node) {
  //  递归 后续遍历
  if (!node) {
    return 0;
  }

  const { left } = node;
  const { right } = node;

  const leftSum = sumOfLeftLeavesV2(left);
  const rightSum = sumOfLeftLeavesV2(right);

  let sum = 0;
  if (left && !left.left && !left.right) {
    sum = left.val;
  }
  return sum + leftSum + rightSum;
}

// 513.找树左下角的值
function findBottomLeftValue(root) {
  // 递归
  // 找最左侧 前序
  function getLeftValue(node, depth) {
    if (!node) {
      return 0;
    }
    const { left } = node;
    const { right } = node;
    if (!left && !right) {
      if (maxDepth < depth) {
        maxDepth = depth;
        maxLeftVal = node.val;
      }
      return;
    }
    if (left) {
      getLeftValue(left, depth + 1);
    }
    if (right) {
      getLeftValue(right, depth + 1);
    }
  }
  let maxDepth = -Infinity;
  let maxLeftVal = 0;
  getLeftValue(root, 0);
  return maxLeftVal;
}

function findBottomLeftValueV2(root) {
  // 层级遍历
  const queue = [root];
  let result = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      if (i === 0) {
        result = node.val;
      }
      const { left } = node;
      const { right } = node;
      if (left) {
        queue.push(left);
      }
      if (right) {
        queue.push(right);
      }
    }
  }
  return result;
}

// 112. 路径总和
function hasPathSum(root, targetSum) {
  // 解析中 说明 前中后序都可以，但感觉 前序更简单一些
  function traversal(node, sum) {
    const { left } = node;
    const { right } = node;
    if (!left && !right) {
      return sum === 0;
    }
    if (left) {
      if (traversal(left, sum - left.val)) { return true; }
    }
    if (right) {
      if (traversal(right, sum - right.val)) { return true; }
    }

    return false; // 此处容易忘记
  }
  if (!root) {
    return false;
  }
  return traversal(root, targetSum - root.val);
}

function hasPathSumV2(root, targetSum) {
  // 迭代
  const stack = root ? [{ node: root, sum: targetSum - root.val }] : [];
  while (stack.length > 0) {
    const { node: { left, right }, sum } = stack.shift();

    if (!left && !right && sum === 0) {
      return true;
    }
    if (right) { // 栈是 先进后出 所以需要先进rihgt 但此题顺序错误不会影响结果，但要注意
      stack.push({ node: right, sum: sum - right.val });
    }
    if (left) {
      stack.push({ node: left, sum: sum - left.val });
    }
  }
  return false;
}

// 113. 路径总和ii

function pathSum(root, targetSum) {
  function getPath(node, path, sum) {
    const { left, right } = node;
    if (!left && !right) {
      if (sum === 0) {
        result.push([...path]);
      }
      return;
    }
    if (left) {
      path.push(left.val);
      sum -= left.val;
      getPath(left, path, sum);
      path.pop();
      sum += left.val;
    }
    if (right) {
      path.push(right.val);
      sum -= right.val;
      getPath(right, path, sum);
      path.pop();
      sum += right.val;
    }
  }

  const result = [];
  const path = [];
  if (!root) {
    return result;
  }
  path.push(root.val);
  getPath(root, path, targetSum - root.val);
  return result;
}

// 106.从中序与后序遍历序列构造二叉树
function buildTree(inorder, postorder) {
  // inorder 中序
  // postorder 后序
  // 左闭右开
  function _buildTree(
    inorder,
    inorderStartIndex,
    inorderEndIndex,
    postorder,
    postorderStartIndex,
    postorderEndIndex,
  ) {
    if (inorderEndIndex - inorderStartIndex === 0) {
      return null;
    }
    const value = postorder[postorderEndIndex - 1];
    const node = new TreeNode(value);

    if (postorderEndIndex - postorderStartIndex === 1) {
      return node;
    }

    let index = inorderStartIndex;
    for (; index < inorderEndIndex; index++) {
      if (value === inorder[index]) {
        break;
      }
    }
    // const leftInorder = inorder.slice(0, index);
    // const rightInorder = inorder.slice(index + 1);

    const _leftInorderStartIndex = inorderStartIndex;
    const _leftInorderEndIndex = index;

    const _rightInorderStartIndex = index + 1;
    const _rightInorderEndIndex = inorderEndIndex;

    const _leftPostorderStartIndex = postorderStartIndex;
    const _leftPostorderEndIndex = _leftPostorderStartIndex + _leftInorderEndIndex - _leftInorderStartIndex;

    const _rightPostorderStartIndex = _leftPostorderEndIndex;
    const _rightPostorderEndIndex = postorderEndIndex - 1;

    node.left = _buildTree(
      inorder,
      _leftInorderStartIndex,
      _leftInorderEndIndex,
      postorder,
      _leftPostorderStartIndex,
      _leftPostorderEndIndex,
    );
    node.right = _buildTree(
      inorder,
      _rightInorderStartIndex,
      _rightInorderEndIndex,
      postorder,
      _rightPostorderStartIndex,
      _rightPostorderEndIndex,
    );
    return node;
  }

  return _buildTree(
    inorder,
    0,
    inorder.length,
    postorder,
    0,
    postorder.length,
  );
}

// 105.从前序与中序遍历序列构造二叉树
function buildTreeWithPre(preorder, inorder) {}

// 654.最大二叉树
function constructMaximumBinaryTree(nums) {
  function buildTree(arr, startIndex, endIndex) {
    if (endIndex - startIndex === 0) {
      return null;
    }

    if (endIndex - startIndex === 1) {
      return new TreeNode(arr[endIndex - 1]);
    }
    let maxVal = -Infinity;
    let maxIndex;
    for (let i = startIndex; i < endIndex; i++) {
      if (maxVal < arr[i]) {
        maxVal = arr[i];
        maxIndex = i;
      }
    }
    const node = new TreeNode(maxVal);
    node.left = buildTree(nums, startIndex, maxIndex);
    node.right = buildTree(nums, maxIndex + 1, endIndex);
    return node;
  }
  return buildTree(nums, 0, nums.length);
}

// 617.合并二叉树
function mergeTrees(tree1, tree2) {
  function mergeTree(tree1, tree2) {
    if (!tree1 && !tree2) {
      return null;
    }
    tree1 = tree1 || new TreeNode(0);
    tree2 = tree2 || new TreeNode(0);
    const node = new TreeNode(
      tree1.val + tree2.val,
      mergeTrees(tree1.left, tree2.left),
      mergeTrees(tree1.right, tree2.right),
    );
    return node;
  }
  return mergeTree(tree1, tree2);
}

function mergeTreesV2(tree1, tree2) {
  function mergeTree(tree1, tree2) {
    if (!tree1) {
      return tree2;
    }
    if (!tree2) {
      return tree1;
    }

    tree1.val += tree2.val;
    tree1.left = mergeTrees(tree1.left, tree2.left);
    tree1.right = mergeTrees(tree1.right, tree2.right);

    return tree1;
  }
  return mergeTree(tree1, tree2);
}

// 700.二叉搜索树中的搜索
function searchBST(root, val) {
  // 迭代法
  let node = root;
  while (node) {
    if (node.val === val) {
      return node;
    } if (node.val < val) {
      node = node.right;
    } else if (node.val > val) {
      node = node.left;
    }
  }
  return null;
}

function searchBSTV2(root, val) {
  // 递归法
  const node = root;
  if (!node) {
    return node;
  }
  if (node.val === val) {
    return node;
  }
  if (node.val < val) {
    return searchBSTV2(node.right, val);
  }
  if (node.val > val) {
    return searchBSTV2(node.left, val);
  }
}

// 739. 每日温度
function dailyTemperatures(nums) {
  const result = new Array(nums.length).fill(0);
  const stack = [0];
  for (let i = 1; i < nums.length; i++) {
    let stackTop = stack[stack.length - 1];
    let stackItem = nums[stackTop];
    const item = nums[i];
    if (item < stackItem) {
      stack.push(i);
    } else if (item === stackItem) {
      stack.push(i);
    } else if (item > stackItem) {
      while (stack.length > 0 && item > stackItem) {
        result[stackTop] = i - stackTop;
        stack.pop();
        stackTop = stack[stack.length - 1];
        stackItem = nums[stackTop];
      }
      stack.push(i);
    }
  }
  return result;
}

// 496.下一个更大元素 I
function nextGreaterElement(nums1, nums2) {
  const result = new Array(nums1.length).fill(-1);
  const stack = new Stack();
  const map = nums1.reduce((obj, item, index) => {
    obj[item] = index;
    return obj;
  }, {});

  stack.push(0); // stack 存放的是 nums2的index
  for (let i = 1; i < nums2.length; i++) {
    let stackItem = nums2[stack.getTop()];
    const item = nums2[i];
    if (stackItem === item) {
      stack.push(i);
    } else if (stackItem > item) {
      stack.push(i);
    } else if (stackItem < item) {
      while (stack.length > 0 && stackItem < item) {
        const mapIndex = map[stackItem];
        if (mapIndex >= 0) {
          result[mapIndex] = item;
        }
        stack.pop();
        stackItem = nums2[stack.getTop()];
      }
      stack.push(i);
    }
  }
  return result;
}

// 503.下一个更大元素II
function nextGreaterElements(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = new Stack();
  stack.push(0);
  for (let i = 1; i < nums.length * 2; i++) {
    const index = i % nums.length;
    const item = nums[index];
    let stackitem = nums[stack.getTop()];
    if (item === stackitem) {
      stack.push(index);
    } else if (item < stackitem) {
      stack.push(index);
    } else if (item > stackitem) {
      while (stack.length > 0 && item > stackitem) {
        result[stack.getTop()] = item;
        stack.pop();
        stackitem = nums[stack.getTop()];
      }
      stack.push(index);
    }
  }
  return result;
}

// 42. 接雨水
function trap(nums) {
  // 单调栈法
  // 思想 横向计算行
  // 从栈底到栈顶，递减
  const stack = new Stack();
  stack.push(0);

  let sum = 0;
  for (let i = 1; i < nums.length; i++) {
    const item = nums[i];
    let stackItem = nums[stack.getTop()];
    if (item === stackItem) {
      stack.pop();
      stack.push(i);
    } else if (item < stackItem) {
      stack.push(i);
    } else if (item > stackItem) {
      while (stack.length && item > stackItem) {
        // const height = Math.min(stackItem, item) - item;
        // 当前项是右边界
        // 所以中间空隙是将要出栈的一个
        // 左边界是第二个将要出栈的
        const right = item;
        const middle = stackItem;
        stack.pop();
        const left = nums[stack.getTop()];
        const height = Math.min(right, left) - middle;
        const width = i - stack.getTop() - 1;
        sum += (height > 0 ? width * height : 0);

        stackItem = left;
      }
      stack.push(i);
    }
  }
  return sum;
}
function trapV2(nums) {
  // 双指针法 不推荐，时间复杂度高
  // 思想 纵向计算列
  // 左指针找左侧最高的
  // 右指针找右侧最高的
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    const currentHeight = nums[i];
    let leftH = currentHeight;
    let rightH = currentHeight;
    for (let j = i - 1; j >= 0; j--) {
      leftH = Math.max(leftH, nums[j]);
    }
    for (let j = i + 1; j < nums.length; j++) {
      rightH = Math.max(rightH, nums[j]);
    }
    const h = Math.min(leftH, rightH) - currentHeight;
    sum += (h > 0 ? h : 0);
  }
  return sum;
}
function trapV3(nums) {
  // 动态规划
  // 双指针中 存在很多重复计算
  // 思路:
  // 从左到右遍历，左侧最高的 得出每个柱子右边柱子的最大高度
  // 从右向左遍历，右侧最高的 得出每个柱子左边柱子的最大高度
  let sum = 0;

  const left = new Array(nums.length).fill(undefined);
  const right = new Array(nums.length).fill(undefined);
  left[0] = nums[0];
  right[right.length - 1] = nums[nums.length - 1];

  for (let i = 1; i < nums.length; i++) {
    left[i] = Math.max(left[i - 1], nums[i]);
  }
  for (let i = nums.length - 2; i > -1; i--) {
    right[i] = Math.max(right[i + 1], nums[i]);
  }

  for (let i = 0; i < nums.length; i++) {
    const cH = nums[i];
    const h = Math.min(left[i], right[i]) - cH;
    sum += (h > 0 ? h : 0);
  }
  return sum;
}

// 84.柱状图中最大的矩形
function largestRectangleArea(arr) {
  // 单调栈法
  // 找左右两边第一个比自己小的;
  // 所以 栈底到栈顶 递增

  const nums = [0, ...arr, 0];
  // 首位需要加上一位，因为会包括真正的首尾

  let maxArea = 0;
  const stack = new Stack();
  stack.push(0);
  for (let i = 0; i < nums.length; i++) {
    let stackItem = nums[stack.getTop()];
    const item = nums[i];
    if (item === stackItem) {
      stack.pop();
      stack.push(i);
    } else if (item > stackItem) {
      stack.push(i);
    } else if (item < stackItem) {
      while (item < stackItem) {
        const right = i;
        const middle = stack.getTop();
        stack.pop();
        const left = stack.getTop();
        const width = (right - left - 1);
        const height = nums[middle];
        maxArea = Math.max(maxArea, width * height);
        stackItem = nums[stack.getTop()];
      }
      stack.push(i);
    }
  }
  return maxArea;
}

function largestRectangleAreaV2(nums) {
  // 双指针法 时间复杂度高，leetcode 超时
  // 找到左边第一个比自己小的 的右边
  // 找到右边第一个比自己小的 的左边
  // 所以当前项是最低的
  let maxArea = 0;
  for (let i = 0; i < nums.length; i++) {
    let left = i;
    let right = i;
    for (;left >= 0; left--) {
      if (nums[left] < nums[i]) {
        break;
      }
    }
    for (;right < nums.length; right++) {
      if (nums[right] < nums[i]) {
        break;
      }
    }
    const width = right - left - 1;

    const height = nums[i];
    maxArea = Math.max(maxArea, width * height);
  }
  return maxArea;
}

function largestRectangleAreaV3(nums) {
  // 动态规划
  // 双指针中 存在很多重复计算
  // 思路:
  // 从左到右遍历，找到左边第一个比自己小的 的右边
  // 从右向左遍历， 找到右边第一个比自己小的 的左边

  let maxArea = 0;

  const minLeft = [];
  const minRight = [];
  minLeft[0] = -1;
  minRight[nums.length - 1] = nums.length;
  for (let i = 1; i < nums.length; i++) {
    let l = i - 1;
    while (l >= 0 && nums[l] >= nums[i]) {
      l = minLeft[l]; // TODO why?
    }
    minLeft[i] = l;
  }
  for (let i = nums.length - 2; i > -1; i--) {
    let l = i + 1;
    while (l < nums.length && nums[l] >= nums[i]) {
      l = minRight[l]; // TODO why?
    }
    minRight[i] = l;
  }
  for (let i = 0; i < nums.length; i++) {
    const width = minRight[i] - minLeft[i] - 1;
    const height = nums[i];
    maxArea = Math.max(maxArea, width * height);
  }
  return maxArea;
}

// 455.分发饼干
[5, 4, 3, 2, 1].sort((a, b) => (a - b));
