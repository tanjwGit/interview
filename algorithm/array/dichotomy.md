## 数组类 二分法
- 题目中存在 `数组为有序数组` 和 `数组中无重复元素`时，可想一想是否可以使用二分法

二分查找涉及的很多的边界条件，需要确定好边界条件的开闭区间，一般为 `[left， right]` 或 `[left， right)`

### 题目一 二分查找
[力扣704](https://leetcode-cn.com/problems/binary-search/submissions/)

```js
var search = function(nums, target) {
    let leftIndex = 0;
    let rightIndex = nums.length - 1;
    let targetIndex = -1;
    while (leftIndex <= rightIndex) {
        const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
        if (nums[middleIndex] === target) {
            targetIndex = middleIndex;
            break;
        } else if (nums[middleIndex] > target) {
            rightIndex = middleIndex - 1;
        } else if (nums[middleIndex] < target) {
            leftIndex = middleIndex + 1;
        }
    }
    return targetIndex;
};
```


### 题目二 搜索插入位置
[力扣35](https://leetcode-cn.com/problems/search-insert-position/)

四种情况
* 目标值在数组所有元素之前
* 目标值等于数组中的某一个元素
* 目标值需插入数组中(在两个元素直接，即第二个元素后移，插入到原第二个元素的位置)
* 目标值在数组所有元素之后

```js
var searchInsert = function(nums, target) {
    let leftIndex = 0;
    let rightIndex = nums.length - 1;
    let targetIndex = 0;
    while (leftIndex <= rightIndex) {
        const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
        if (nums[middleIndex] === target) {
            targetIndex = middleIndex;
            break;
        } else if (nums[middleIndex] > target) {
            rightIndex = middleIndex - 1;
            
        } else if (nums[middleIndex] < target) {
            leftIndex = middleIndex + 1;
        }
        targetIndex = rightIndex + 1; // 因为需要右边元素后移，插入到右边元素的位置
    }
    return targetIndex;
};
```

### 题目三 在排序数组中查找元素的第一个和最后一个位置
[力扣34](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

寻找target在数组里的左右边界，有三种情况：
* `target` 在数组的左边或者右边，如[1, 2, 3] 0 或[1, 2, 3] 4,返回应该是 [-1, -1]
* `target` 在数组范围内，但数组中不存在target，如 [1, 2, 4, 5] 3, 返回应该是 [-1, -1]
* `target` 在数组范围内, 且数组中存在target， 如 [1, 2, 3] 2, 返回应该是 [1, 1]

接下来，用二分法分别寻找左边界，和右边界

#### 版本一

1. 寻找右边界, 即寻找最右边等于taget的值，没有就是 -1
```js
function getRightBorder(nums, target) {
  let leftIndex = 0;
  let rightIndex = nums.length - 1;
  let rightBorderIndex = -2;
  while(leftIndex <= rightIndex) {
    const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    if (nums[middleIndex] === target) {
      // 相等时，因为是找右边界 所以移动左边届，找到最右边的
      leftIndex = middleIndex + 1;
      rightBorderIndex = middleIndex;
    } else if (nums[middleIndex] > target) {
      // 目标值在中间值左侧 把中间值的前一个设为右边界
      rightIndex = middleIndex - 1;
    } else if (nums[middleIndex] < target) {
      // 目标值在右侧时 把左边界移到中间
      leftIndex = middleIndex + 1;
      rightBorderIndex = middleIndex + 1;
    }
  }
  return rightBorderIndex;
}
```
2. 寻找左边界
```js
function getLeftBorder(nums, target) {
  let leftIndex = 0;
  let rightIndex = nums.length - 1;
  let leftBorderIndex = -1;
  while(leftIndex <= rightIndex) {
    const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    if (nums[middleIndex] === target) {
      rightIndex = middleIndex - 1;
      leftBorderIndex = middleIndex;
    } else if (nums[middleIndex] > target) {
      // 在左侧
      rightIndex = middleIndex - 1;
      leftBorderIndex = middleIndex - 1;
    } else if (nums[middleIndex] < target) {
      // 在右侧
      leftIndex = middleIndex + 1;
    }
  }
  return leftBorderIndex;
}
```

3. 处理三种情况
```js
var searchRange = function(nums, target) {
    const leftBorderIndex = getLeftBorder(nums, target);
    const rightBorderIndex = getRightBorder(nums, target);
    if(nums[leftBorderIndex] === nums[rightBorderIndex] && nums[rightBorderIndex] === target) {
        return [leftBorderIndex, rightBorderIndex];
    } else {
        return [-1, -1];
    }
}
```
#### 版本二
<details>
  <summary>大佬版本</summary>

  ```js
  const getLeftBorder = (nums, target) => {
    let left = 0, right = nums.length - 1;
    let leftBorder = -2;// 记录一下leftBorder没有被赋值的情况
    while(left <= right){
        let middle = left + ((right - left) >> 1);
        if(nums[middle] >= target){ // 寻找左边界，nums[middle] == target的时候更新right
            right = middle - 1;
            leftBorder = right;
        } else {
            left = middle + 1;
        }
    }
    return leftBorder;
  }

  const getRightBorder = (nums, target) => {
    let left = 0, right = nums.length - 1;
    let rightBorder = -2; // 记录一下rightBorder没有被赋值的情况
    while (left <= right) {
        let middle = left + ((right - left) >> 1);
        if (nums[middle] > target) {
            right = middle - 1;
        } else { // 寻找右边界，nums[middle] == target的时候更新left
            left = middle + 1;
            rightBorder = left;
        }
    }
    return rightBorder;
  }

  var searchRange = function(nums, target) {
    let leftBorder = getLeftBorder(nums, target);
    let rightBorder = getRightBorder(nums, target);
    // 情况一
    if(leftBorder === -2 || rightBorder === -2) return [-1,-1];
    // 情况三
    if (rightBorder - leftBorder > 1) return [leftBorder + 1, rightBorder - 1];
    // 情况二
    return [-1, -1];
  }
  ```
</details>


### 题目四 x 的平方根: TODO
[力扣69](https://leetcode-cn.com/)

### 题目五 有效的完全平方数: TODO
[力扣367](https://leetcode-cn.com/)