
## setImmediate和setTimeout(fn, 0)的执行顺序？
  ```js
    setInterval(function() {
        setTimeout(function() {
            console.log('setTimeout3');
        }, 0);

        setImmediate(function() {
            console.log('setImmediate4');
        });

        console.log('console1');

        process.nextTick(function() {
            console.log('nextTick2');
        });
    }, 1000)
  ```

  - setImmediate(fn): 想异步执行代码， 任何作为 setImmediate() 参数传递的函数都是在事件循环的下一次迭代中执行的回调。[node setImmediate](https://nodejs.dev/learn/understanding-setimmediate)

  - 从 node 的事件轮训机制上讲 `setTimeout` 的执行阶段早于 `setImmediate`
  - 但在实际中先后顺序不一定
    - 原因：
      - setTimeout 在 node 的源码中, 0 会被修改为 1;
        - 经过尝试在浏览器中, 0 应该也被修改为了 1;
      - 还有一种说法是 创建 setTimeout 任务时，会涉及到 创建红黑树等到性能消耗


## 并行/并发
  - 示意图
    ![并行与并发](http://joearms.github.io/images/con_and_par.jpg)
    - 并发: concurrent
      -  2 个队列 对应 1 个咖啡机
    - 并行: parallel
      -  2 个队列 对应 2 个咖啡机
    - Node.js 通过事件循环来挨个抽取事件队列中的一个个 Task 执行;
    - 因此避免了传统的多线程情况下 `2个队列对应 1个咖啡机` 的时候上下文切换以及资源争抢/同步的问题, 所以获得了高并发的成就
    - 在 node 中并行, 你可以通过 cluster 来再添加一个咖啡机。



## Child Process
 - TODO
## cluster
 - TODO
## process.nextTick？
  - 不属于 Event loop 中的某一个阶段, 而是在 Event loop 的每一个阶段结束后, 直接执行 nextTickQueue 中插入的 "Tick"， 直到整个 Queue 处理完
  - 衍生题:
    - 递归调用 process.nextTick 会怎么样?
    ```js
    function test() { 
      process.nextTick(() => test());
    }
    test();
    Promise.resolve().then(() => {
      console.log(1);
    })
    // 一直执行 test, 后面的 Promise 无法执行
    // 如果直接在控制台运行，会卡死
    
    ```

    ```js
    function test() { 
      setTimeout(() => test(), 0);
    }
    test();
    Promise.resolve().then(() => {
      console.log(1);
    })
    // test 会被不停执行， 但 Promise 仍然能够执行
    // 如果直接在控制台运行，不会卡死
    ```


## console.log()输出时是同步还是异步的问题？
[跳转](https://github.com/byted-mofan/think/issues/30)
  - 摘要
    - JS中对象是引用类型，每次使用对象时，都只是使用了对象在堆中的引用;
    - 当不展开对象看的时候，console.log打印的是对象当时的快照
    - 展开对象时，会是重新 到 内存中读取对象的属性值;

    - console.* 并不是JavaScript 正式的一部分, 是由宿主环境（请参考本书的“类型和语法”部分）添加到JavaScript 中的
    - 因此，不同的浏览器和JavaScript 环境可以按照自己的意愿来实现，有时候这会引起混淆
    - `尤其` 在某些条件下，某些浏览器的console.log(..) 并不会把传入的内容立即输出。
    - 原因是 在许多程序（不只是JavaScript）中，I/O 是非常低速的阻塞部分，所以，（从页面/UI 的角度来说）浏览器在后台异步处理控制台I/O 能够提高性能，这时用户甚至可能根本意识不到其发生。

    - 解决
      - 优: 在js 调试器中 使用断点调试
      - 次优: 把对象序列化后，在console