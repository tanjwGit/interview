## for...of 循环
  - 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员
  - 数组、Set 和 Map 结构、类数组（比如arguments对象、DOM NodeList 对象）、Generator 对象、字符串
  - 可以用 break、continue、return 配合使用
  - 对象不能直接使用
    - 可以在对象上实现Symbol.iterator属性，来使用 for of
  - 遍历出的是 键名 对应的 值;
    - 在数组中是 下标 对应的值


## for...in 循环
  - 遍历键名
    - 但数组键名是数字， for in 遍历出的是字符串
  - 会遍历出其他 手动添加的 其他键名，包括原型上的键名
  - 某些情况下，会以仁义顺序遍历键名
  - 是为遍历对象设计的，不适用与数组，但可以使用
