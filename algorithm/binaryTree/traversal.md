### 题目一 [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)

```js
  // 递归法
  var preorderTraversal = function(root) {
    const result = [];
    const traversal = (node) => {
        if(!node) {
            return;
        }
        result.push(node.val);
        traversal(node.left);
        traversal(node.right);
    }
    traversal(root);
    return result;
  };
```

```js
  // 利用栈 遍历
  var preorderTraversal = function(root) {
    const result = [];
    const stack = root ? [root] : [];
    const symbolTag = Symbol('tag');
    
    while(stack.length > 0) {
        const node = stack.pop();
        if (node !== symbolTag) {
            if (node.right) {
                stack.push(node.right);
            }

            if (node.left) {
                stack.push(node.left);
            }

            stack.push(node, symbolTag);

        } else {
            result.push(stack.pop().val);
        }
    }
    return result;
};
```
<br />

---

### 题目二 [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/) TODO

<br />

---

### 题目三 [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/) TODO

<br />

---


### 题目四 [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
  <!-- 即：广度优先遍历 -->
  ```js
  // 利用队列
  var levelOrder = function(root) {
    const reslut = [];
    const queue = root ? [root] : [];

    while (queue.length > 0) {
        const arr = [];
        const length = queue.length;
        for (let i = 0; i < length; i ++) {
            const node = queue.shift();
            arr.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
        reslut.push(arr);
    }
    return reslut;
  };
  ```

  - 利用层级遍历可完成以下题目: TODO
    - 107.二叉树的层次遍历II
    - 199.二叉树的右视图
    - 637.二叉树的层平均值
    - 429.N叉树的层序遍历
    - 515.在每个树行中找最大值
    - 116.填充每个节点的下一个右侧节点指针
    - 117.填充每个节点的下一个右侧节点指针II
    - 104.二叉树的最大深度
    - 111.二叉树的最小深度
<br />

---

### 题目十四 [226.翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

```js
// 方法一 递归
var invertTree = function(root) {
    if (!root) {
        return root;
    }
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
    return root;
};

```

```js
  // 方法一 深度遍历
  var invertTree = function(root) {
    const stack = root ? [root] : [];
    const key = Symbol('key');
    while(stack.length > 0) {
        let node = stack.pop();
        if(node !== key) {
            if (node.right) {
                stack.push(node.right);
            }

            if (node.left) {
                stack.push(node.left);
            }

            stack.push(node);
            stack.push(key);
        } else {
            node = stack.pop();
            [node.left, node.right] = [node.right, node.left];
        }

    }
    return root;
  };
```


```js
  // 方法一 层级遍历 广度
  var invertTree = function(root) {
    const queue = root ? [root] : [];
    while(queue.length > 0) {
        const len = queue.length;
        for(let i = 0; i < len; i ++) {
            const node = queue.shift();
            [node.left, node.right] = [node.right, node.left];
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
        }
    }
    return root;
  }
```
