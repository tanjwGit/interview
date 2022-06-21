## 双指针法
双指针有三种形式
* 快慢指针: 通过一个快指针和慢指针在一个for循环下完成两个for循环的工作
> 在数组和链表的操作中是非常常见的，很多考察数组、链表、字符串等操作的面试题，都使用双指针法
* 相向双指针: 
* 滑动窗口: 就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果

### 题目一 移除元素
[力扣27](https://leetcode-cn.com/problems/remove-element/submissions/)

* 快慢指针法
```js
var removeElement = function(nums, val) {
    let slowIndex = 0;
    for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
        if (nums[fastIndex] !== val) { // 把不是val的值，前移
            nums[slowIndex] = nums[fastIndex];
            slowIndex++;
        }
    }
    return slowIndex;
}; 
```
* 相向双指针
```js
var removeElement = function(nums, val) {
  let leftIndex = 0;
  let rightIndex = nums.length - 1;
  while (leftIndex <= rightIndex) {
    while (leftIndex <= rightIndex && nums[leftIndex] != val) {
      leftIndex ++;
      // 找到等于val的下标
    }
    while (leftIndex <= rightIndex && nums[rightIndex] === val) {
      rightIndex --;
      // 找到不等于val的下标
    }

    if(leftIndex < rightIndex) {
      [nums[leftIndex], nums[rightIndex]] = [nums[rightIndex], nums[leftIndex]];
      leftIndex++;
      rightIndex++;
    }
  }
  return leftIndex;
}
```

### 题目二 删除排序数组中的重复项 TODO
[力扣27](https://leetcode-cn.com/problems/remove-element/submissions/)

### 题目三 移动零 TODO
[力扣27](https://leetcode-cn.com/problems/remove-element/submissions/)

### 题目四 比较含退格的字符串 TODO
[力扣27](https://leetcode-cn.com/problems/remove-element/submissions/)

### 题目五 有序数组的平方
[力扣997](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

* 暴力解法
>先平方，在重新排序

* 双指针
```js
var sortedSquares = function(nums) {
    let leftIndex = 0;
    let rightIndex = nums.length -1;

    const newArr = [];
    let index = rightIndex;

    while(leftIndex <= rightIndex) {
        if(nums[leftIndex]**2 >= nums[rightIndex]**2) {
            newArr[index] = nums[leftIndex]**2;
            leftIndex++;
        } else {
            newArr[index] = nums[rightIndex]**2;
            rightIndex--;
        }
        index --;
    }
    return newArr;
};
```
### 题目六 长度最小的子数组
[力扣209](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

* 滑动窗口
```js
var minSubArrayLen = function(target, nums) {
    let i = 0;
    let minLen = nums.length + 1;
    let sum = 0;
    for (let j = 0; j < nums.length; j ++) {
        sum = sum + nums[j];
        while(sum >= target) {
            minLen = Math.min(minLen, j - i + 1);
            sum = sum - nums[i];
            i++;
        }
    }
    return minLen === nums.length + 1 ? 0 : minLen;
};
```

* 滑动窗口需要思考的问题
1. 窗口扩大时， 应该更新哪些数据？
2. 什么条件下， 窗口要暂停扩大，从左侧缩小窗口？
3. 缩小窗口时，应该更新哪些数据？
4. 结果数据应该在扩大窗口还是缩小窗口时更新？

### 题目七 水果成篮 TODO
[力扣904](https://leetcode-cn.com/problems/remove-element/submissions/)

### 题目八 最小覆盖子串
[力扣76](https://leetcode-cn.com/problems/minimum-window-substring/)
```js
var minWindow = function(s, t) {
    const need = {};
    let needSize = 0;
    const window = {};


    for (let i = 0; i < t.length; i ++) {
        if(need[t[i]] === undefined) {
            need[t[i]] = 0;
            needSize ++;
        }
        need[t[i]]++;       
    }


    let i = 0;
    let startIndex = 0;
    let strLength = s.length + 1;
    let vaild = 0;

    for(let j = 0; j < s.length; j ++) {
        const rightChar = s[j];
        if (window[rightChar] === undefined) {
            window[rightChar] = 0;
        }
        window[rightChar] ++;
        if (window[rightChar] === need[rightChar] && need[rightChar]) {
            vaild++;
        }

        while(vaild === needSize) {
            if(j - i + 1 <= strLength) {
                startIndex = i;
                strLength = j - i + 1;
            }
            const leftChar = s[i];

            i++;
            if (window[leftChar] === need[leftChar] && need[leftChar]) {
                vaild--;
            }
            window[leftChar]--;
        }
    }
    return strLength === s.length + 1 ? "" : s.substr(startIndex, strLength);
};
```