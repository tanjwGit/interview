1. 简单描述一下 Babel 的编译过程？
* 解析（Parse）：包括词法分析和语法分析。词法分析主要把字符流源代码（Char Stream）转换成令牌流（ Token Stream），语法分析主要是将令牌流转换成抽象语法树（Abstract Syntax Tree，AST）。
* 转换（Transform）：通过 Babel 的插件能力，将高版本语法的 AST 转换成支持低版本语法的 AST。当然在此过程中也可以对 AST 的 Node 节点进行优化操作，比如添加、更新以及移除节点等。
* 生成（Generate）：将 AST 转换成字符串形式的低版本代码，同时也能创建 Source Map 映射。
