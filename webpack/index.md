## 11. webpack 多入口打包？ plugin和loader的差别？
  * loader 加载器，webpack把每一个文件都当作一个模块，但是webpack只能解析js文件，loader可以让webpack拥有加载和解析非js文件的能力；在module.rules中配置规则；
  * plugin 扩展webpack的功能，webpack运行的周期中会广播许多事件，plugin可以监听这些事件，同webpack提供的api改变输出结果；在plugins中单独配置，每一项是一个实例，通过构造函数传入参数

## tree-Shaking 实现原理
  - 基于 ES Module 规范的 Dead Code Elimination 技术;
  - 在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化;

  - 如何使用 Tree Shaking?
    - 使用es Moudle 书写模块代码
    - webpack配置 optimization.usedExports 为 true, 启动标记功能;
    - 禁止 Babel 转译模块导入导出语句;
    - 启动代码优化功能，可通过以下方式实现
      - 配置 mode = production
      - 配置 optimization.minimize = true
      - 提供 optimization.minimizer 数组


  - 原理？
    - CommonJs 等旧模块，导入导出是动态的、难以预测的
    - esMoudle 是模块顶部静态声明导入;
    - 具体步骤:
      - 标记: Webpack 标记并删除没有被其它模块使用的导出语句，分为三个阶段
        - Make 阶段: 收集模块导出变量并记录到模块依赖图 MoudleGraph 变量中
        - seal 阶段: 遍历 MoudleGraph 标记模块到处的变量有没有被使用
        - 生成产物时，如果变量没有被其他模块使用则删除对应的导出语句;
      - 删除 Dead Code
        - 利用 Terser、UglifyJS 等工具删除模块内没有使用的代码
      
  - 实践
    - 在实际的优化效果并不如 Tree Shaking 原本设想的那么完美;
      - 只是停留在代码的静态分析层面，没有从语义上分析模块导出值是不是真的被有效使用;
      - 比如模块A 导入了模块B中的变量B1，并赋值给了A1，但是A1没有使用，这种既不会被 tree shaking 优化; 

