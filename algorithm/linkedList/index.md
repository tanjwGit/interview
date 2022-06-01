## 链表


### 链表的定义声明

```js
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
```
<br>

***


### 题目一 [203.移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

```js
// 虚拟头结点法 避免操作头节点
var removeElements = function(head, val) {
    let dummyHead = new ListNode(0, undefined);
    dummyHead.next = head;
    let currentNode = dummyHead;
    while(currentNode.next) {
       if(currentNode.next.val === val) {
            currentNode.next = currentNode.next.next;
       } else {
           currentNode = currentNode.next;
       }
    }
    return dummyHead.next;
};
```
<br>

***

### 题目二 [707.设计链表](https://leetcode-cn.com/problems/design-linked-list/)

```js
// 注意边界值
// index 是从0开始的
var MyLinkedList = function() {
    this.dummyHead = new ListNode(0, undefined);
    this.size = 0;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {

    if(index < 0 || (index > (this.size - 1))) {
        return -1;
    }

    let currentNode = this.dummyHead.next;

    while(index > 0) {
        currentNode = currentNode.next;
        index --;
    }
    return currentNode.val;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    const nextNode = this.dummyHead.next;
    const newNode = new ListNode(val, nextNode);
    this.dummyHead.next = newNode;
    this.size = this.size + 1;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    let currentNode = this.dummyHead;
    while(currentNode.next) {
        currentNode = currentNode.next;
    }
    currentNode.next = new ListNode(val, undefined);
    this.size = this.size + 1;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if(index > this.size) {
        return null;
    }

    if(index < 0) {
        index = 0;
    }

    let currentNode = this.dummyHead;
    while(index > 0) {
        currentNode = currentNode.next;
        index --;
    }
    const nextNode = currentNode.next;
    const newNode = new ListNode(val, nextNode);

    currentNode.next = newNode;

    this.size = this.size + 1;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    let currentNode = this.dummyHead;
    if(index < 0 || index > (this.size - 1)) {
        return null;
    }
    while(index > 0) {
        currentNode = currentNode.next;
        index --;
    }

    currentNode.next = currentNode.next.next;
    this.size = this.size - 1;

};
```

<br>

***

### 题目三 [206.反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

```js
var reverseList = function(head) {

    let currentNode = head;
    let prevNode = null;
    let nextNode;

    while(currentNode) {
        nextNode = currentNode.next

        currentNode.next = prevNode;
        
        prevNode = currentNode;
        currentNode = nextNode;
    }
    return prevNode;
};
```

> TODO: 从前往后翻转指针指向递归法、从后往前翻转指针指向递归法

<br>

***

### 题目四 [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

* 思路：
![三步](https://code-thinking.cdn.bcebos.com/pics/24.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B92.png)

```js
var swapPairs = function(head) {
    const dummyHead = new ListNode(1, undefined);
    dummyHead.next = head;

    let currentNode = dummyHead;

    let nextNode = undefined;
    let next2Node = undefined;

    while (currentNode.next && currentNode.next.next) {
        nextNode = currentNode.next; // 当前节点指向的节点
        next2Node = currentNode.next.next.next; // 当前节点下下个节点指向的节点

        currentNode.next = currentNode.next.next;
        currentNode.next.next = nextNode;
        currentNode.next.next.next = next2Node;
        
        currentNode = currentNode.next.next; // 移动两位，准备下一轮交换

    }

    return dummyHead.next;
};
```

<br>

***
### 题目五 [19.删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

* 双指针经典用法
> 快指针先移动n下，然后快慢指针同时移动，快指针到达终点，慢指针就是要删除的元素

```js
var removeNthFromEnd = function(head, n) {
    const dummyHead = new ListNode(1, head);
    let fastNode = dummyHead;
    let slowNode = dummyHead;

    while(n > 0 && fastNode) {
        fastNode = fastNode.next;
        n--;
    }

    fastNode = fastNode.next; // 快指针多走一步，使慢指针指向要删除节点的上一个节点

    while(fastNode) {
        fastNode = fastNode.next;
        slowNode = slowNode.next;
    }

    slowNode.next = slowNode.next.next;
    return dummyHead.next;
};
```

<br>

***
### 题目六 [面试题 02.07. 链表相交](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

> 如果有两交点，则交点之后的长度一定相等，所以先把两个链表设置为相等的长度

```js
var getLinkSize = (head) => {
    let size = 0;
    let currentNode = head;
    while(currentNode) {
        size++;
        currentNode = currentNode.next;
    }
    return size;
}
var getIntersectionNode = function(headA, headB) {
    let sizeA = getLinkSize(headA);
    let sizeB = getLinkSize(headB);

    let currentNodeA = headA;
    let currentNodeB = headB;

    if (sizeA < sizeB) {
        [sizeA, sizeB] = [sizeB, sizeA];
        [currentNodeA, currentNodeB] = [currentNodeB, currentNodeA];
    }

    let count = sizeA - sizeB;

    while(count > 0) {
        count --;
        currentNodeA = currentNodeA.next;
        
    }
    while(currentNodeA) {
        if (currentNodeA === currentNodeB) {
            return currentNodeA;
        } else {
            currentNodeA = currentNodeA.next;
            currentNodeB = currentNodeB.next;
        }
    }
    return null;
};
```

***
### 题目七 [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

#### 判断有环
* 快慢指针法，快指针走两步，慢指针走一步
> 因为如果有环，快指针一定先进入环内，慢指针后进入，相对于慢指针来说，快指针是一个节点一个节点靠近慢指针的，所以一定会重

<center>

![示意图](https://tva1.sinaimg.cn/large/008eGmZEly1goo4xglk9yg30fs0b6u0x.gif)

</center>
<br/>

#### 寻找环的入口
* 从头结点出发一个指针，从相遇节点 也出发一个指针，这两个指针每次只走一个节点， 那么当这两个指针相遇的时候就是 环形入口的节点

![示意图](https://img-blog.csdnimg.cn/20210318162938397.png)

```js
var detectCycle = function(head) {
    // 检测是否有换
    let fastNode = head;
    let slowNode = head;

    
    while(fastNode && fastNode.next) {

        slowNode = slowNode.next;
        fastNode = fastNode.next.next; // 一定要先走，在判断是否相等，因为初始是相等的

        if(slowNode === fastNode) {
            // 有环
            slowNode = head;
            while(slowNode !== fastNode) {
                slowNode = slowNode.next;
                fastNode = fastNode.next;
            }
            return fastNode;
        }
    }
    // 无环
    return null;
};
```
