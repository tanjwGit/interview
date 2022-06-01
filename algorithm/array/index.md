## 无关算法 模拟过程
* 十分考察对代码的掌控能力
循环不变量原则(即 区间方式不变)
### 题目一 螺旋矩阵II
[力扣59](https://leetcode-cn.com/problems/spiral-matrix-ii/)

模拟顺时针画矩阵的过程:

* 填充上行从左到右
* 填充右列从上到下
* 填充下行从右到左
* 填充左列从下到上
由外向内一圈一圈这么画下去。

![图解](https://img-blog.csdnimg.cn/2020121623550681.png)

```js
var generateMatrix = function(n) {
    let startX = 0; // 每圈的起始位置
    let startY = 0;
    let num = 1; // 填充到矩阵中的值，从1开始
    let offset = 1; // 每次填充一条边需要减去的个数（用于控制每一条边遍历的长度）
    let loop = Math.floor(n / 2); // 需要循环的次数;
    // const arr = new Array(n).fill(new Array(n).fill(0));
    let arr = new Array(n).fill(0).map(() => new Array(n).fill(0));


    while(loop > 0) {
        let i = startX;
        let j = startY;

        for(; j < startY + n - offset; j++) { // j < 起始点位置 + n - 1 - 左侧不需要遍历 - 右侧不需要遍历
            arr[i][j] = num;
            num ++;
        }

        for(; i < startX + n - offset; i++) {
            arr[i][j] = num;
            num ++;
        }

        for(; j > startY; j--) {
            arr[i][j] = num;
            num ++;
        }

        for(; i > startX; i--) {
            arr[i][j] = num;
            num ++;
        }


        loop --;
        offset += 2;
        startX ++;
        startY ++;
    }


    if (n % 2 === 1) {
        const middleIndex = Math.floor(n / 2);
        arr[middleIndex][middleIndex] = num;
    }
    return arr;

};

```