
<!-- 摘要自:
  阮一峰 es6
  https://mp.weixin.qq.com/s/JSlJn_LzbkAOy6LNyY5_jQ -->


- CommonJS
  - 只能在运行时确定输入输出(运行时加载)， 输出的是值的缓存(拷贝)，不存在动态更新
  - require: 进行模块的导入
    - 值的拷贝:
      - 把导出值复制一份，放入新的内存中;
      - 使用时每次从新的内存中取值，对变量修改不能同步;
  - module.exports
    - module: 记录当前模块的详细信息
    - exports: 记录当前模块导出的变量
- es6 Module: “编译时加载”（静态加载、静态编译），输出模块内部实时的值
  - export
    - 值的引用
      - 导出的是内存地址; 所以指向同一块内存
      - 使用时根据地址 找到 内存空间，实现 动态绑定
  - import
    - ES module会根据 import 关系构建一棵依赖树,遍历到树的叶子模块后，然后根据依赖关系，反向找到父模块，将export/import指向同一地址;
# es6 Module
## export
## import
import命令具有提升效果，会提升到整个模块的头部，首先执行；
因为：import命令是编译阶段执行的，在代码运行之前；

* 多次重复执行同一句import语句，那么只会执行一次，而不会执行多次

## export 与 import 的复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起
```js
export { foo } from 'my_module';

// 可以简单理解为
import { foo } from 'my_module';
export { foo };
```
* 写成一行以后，foo实际上并没有被导入当前模块，只是相当于对外转发了这个接口，导致当前模块不能直接使用foo;


- 区分 import 命令和 函数两种形式
  - import()函数，支持动态加载模块，import()返回一个 Promise 对象；




## ES6 模块与 CommonJS 模块的差异
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  - CommonJS 读取一次，会有缓存，可修改
  - ES6 引用，但只读，不可修改
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。


## 处理循环引用 及 循环引用解决原理？
  - 循环引用要解决两个问题
    - 如何避免死循环？
    - 确定输出的值是什么？
  - CommonJS 解决原理
    - 模块缓存
      - 每一个模块都先加入缓存再执行，每次遇到require都先检查缓存，这样就不会出现死循环；
      - 借助缓存，输出的值也很简单就能找到;
      - 由于缓存，一个模块不会被多次执行, 只会加载一次
    - CommonJS借助模块缓存，遇到require函数会先检查是否有缓存，已经有的则不会进入执行，在模块缓存中还记录着导出的变量的拷贝值
  - EsMoudle 解决原理
    - 模块地图(Moudle Map)
      - 类似一棵树，树中的每个节点就是一个 模块记录;
    - 模块记录
      - 记录了模块导出值的的内存地址，加载状态
      - 在其他模块导入时，根据模块记录，把导入的变量指向同一块内存，这样就是实现了动态绑定
    - 步骤
      - 开始处理该模块（文件）
      - import 提升
      - 标记模块记录为 获取中（fetching）
        - 表示 已经进入，但没有执行完成
        - [例题分析](./module.md#题目一-esmoudle的输出-解析)
    - ES Module借助模块地图，已经进入过的模块标注为获取中，遇到import语句会去检查这个地图，已经标注为获取中的则不会进入，地图中的每一个节点是一个模块记录，上面有导出变量的内存地址，导入时会做一个连接——即指向同一块内存

- CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象

- CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存;

- CommonJS 模块的重要特性是加载时执行,且同步，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出


- ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。


## CommonJS中 module.exports 和 exports 有什么不同？
  - module.exports 和 exports 指向同一块内存，但使用上不完全等价
  - 绑定属性时，写法相同
    ```js
    exports.a = 'A';
    module.exports.a = 'A';
    ```
  - 可以直接给 `module.exports` 赋值
    - `module.exports = {a: 'A'}`
  - 但是不能直接给 `exports` 赋值
    - 可以理解为不能改变 `exports` 的引用地址
    - 虽然是指向同一块内存，但是是通过module.exports 进行导出，所以不能修改 `exports` 的引用地址

  - 答案：
    - CommonJS的export和module.export指向同一块内存，但由于最后导出的是module.export，所以不能直接给export赋值，会导致指向丢失


## 引入模块时的路径解析规则？
  - 对于 核心模块
    - node 已将其编译成 二进制代码，直接书写标识符即可
      - 如： fs、 http
  - 自定有的文件模块
    - require 会将相对路径转化为 绝对路径，找到模块
  - 第三方模块（npm包）
    - 使用 path 变量，依查找当前路径下的 node_modules 文件夹， 如果没有就去父级的找，直到根目录;
    - 找到对应包后，以package.json 下的main字段为包的入口
    - 如果没有main 字段，则查找 index.js > index.json > index.node







## 两道例题
  ### 题目一
  #### commonjs的输出
    ```js
      //index.js
      var a = require('./a')
      console.log('入口模块引用a模块：',a)

      // a.js
      exports.a = '原始值-a模块内变量'
      var b = require('./b')
      console.log('a模块引用b模块：',b)
      exports.a = '修改值-a模块内变量'

      // b.js
      exports.b ='原始值-b模块内变量'
      var a = require('./a')
      console.log('b模块引用a模块',a)
      exports.b = '修改值-b模块内变量'
    ```

    ```js
    // node index.js
    'b模块引用a模块': `原始值-a模块内变量`
    `a模块引用b模块`: `修改值-b模块内变量`
    `入口模块引用a模块`: `修改值-a模块内变量`
    ```
  #### esMoudle的输出
    ```js
      // index.mjs
      import * as a from './a.mjs'
      console.log('入口模块引用a模块：',a)

      // a.mjs
      let a = "原始值-a模块内变量"
      export { a }
      import * as b from "./b.mjs"
      console.log("a模块引用b模块：", b)
      a = "修改值-a模块内变量"

      // b.mjs
      let b = "原始值-b模块内变量"
      export { b }
      import * as a from "./a.mjs"
      console.log("b模块引用a模块：", a)
      b = "修改值-b模块内变量"
    ```
  - import语句有提升的效果, 实际执行可以看作这样
    ```js
      // index.mjs
      import * as a from './a.mjs'
      console.log('入口模块引用a模块：',a)

       // a.mjs
      import * as b from "./b.mjs"
      let a = "原始值-a模块内变量"
      export { a }
      console.log("a模块引用b模块：", b)
      a = "修改值-a模块内变量"


      // b.mjs
      import * as a from "./a.mjs"
      let b = "原始值-b模块内变量"
      export { b }
      console.log("b模块引用a模块：", a)
      b = "修改值-b模块内变量"
    ```

    ```js
      // node index.js
      'b模块引用a模块': `{a: <uninitialized>}`
      `a模块引用b模块`: `{b: "修改值-b模块内变量"}`
      `入口模块引用a模块`:  `{a: 修改值-a模块内变量}`
    ```
  ### 题目二
  #### commonjs的输出
  ```js
    // a.js
    let count = 1;
    module.exports = {
      count,
      add() {
        count++;
      },
      get() {
        return count;
      }
    };

    // index.js
    const { count, add, get } = require('./a.js');
    console.log(count);    // 1
    add();
    console.log(count);    // 1
    console.log(get());    // 2
  ```

  #### esMoudle的输出
    ```js
      // b.mjs
      export let count = 1;
      export function add() {
        count++;
      }
      export function get() {
        return count;
      }

      // a.mjs
      import { count, add, get } from './b.mjs';
      console.log(count);    // 1
      add();
      console.log(count);    // 2
      console.log(get());    // 2
    ```



### 题目一 esMoudle的输出 解析
  1. 【入口模块】首先进入入口模块，在模块地图中把入口模块的模块记录标记为“获取中”（Fetching），表示已经进入，但没执行完毕，
  2. import * as a from './a.mjs' 执行，进入a模块，此时模块地图中a的模块记录标记为“获取中”
  3. 【a模块】import * as b from './b.mjs' 执行，进入b模块，此时模块地图中b的模块记录标记为“获取中”，
  4. 【b模块】import * as a from './a.mjs' 执行，检查模块地图，模块a已经是Fetching态，不再进去，
  5. let b = '原始值-b模块内变量' 模块记录中，存储b的内存块初始化，
  6. console.log('b模块引用a模块：', a) 根据模块记录到指向的内存中取值，是{ a:}
  7. b = '修改值-b模块内变量' 模块记录中，存储b的内存块值修改
  8. 【a模块】let a = '原始值-a模块内变量' 模块记录中，存储a的内存块初始化，
  9. console.log('a模块引用b模块：', b) 根据模块记录到指向的内存中取值，是{ b: '修改值-b模块内变量' }
  10. a = '修改值-a模块内变量' 模块记录中，存储a的内存块值修改
  11. 【入口模块】console.log('入口模块引用a模块：',a) 根据模块记录，到指向的内存中取值，是{ a: '修改值-a模块内变量' }