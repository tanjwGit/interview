- CommonJS: require module.exports 只能在运行时确定输入输出， 输出的是值的缓存(拷贝)，不存在动态更新
- AMD:
- es6 Module: “编译时加载”或者静态加载，输出模块内部实时的值
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


## 处理循环加载

- CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象

- CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存;

- CommonJS 模块的重要特性是加载时执行,且同步，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出


- ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。