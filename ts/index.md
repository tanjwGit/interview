1. 什么是typescript
TS是一个强类型的JavaScript超集，支持所有JS已有语法，支持面向对象编程的概念，如：类、接口、继承、泛型等。TS并不直接在浏览器上运行，需要编译成JS来运行

16. keyof和typeof关键字的作用
keyof 索引类型查询操作符 获取索引类型的属性名，构成联合类型。
typeof获取一个变量火对象的类型

17. Exclude、Omit、Merge、Intersection、Overwrite的作用
Exclude<T, U>从Y中排出可以分配给U的元素.
Omit<T, K>忽略T中的某些属性.
Merge<O1, O2>将两个对象的属性合并.
Compute<A & B>将交叉类型合并.
Intersection<T, U>取T的属性，此属性同样哦存在于U.
Overwrite<T, U>用U的属性覆盖T的相同属性.

19. implements与extends的区别
extends 子类会继承父类的所有属性和方法
implements 使用该关键字的类将需要实现的需要实现的类的所有属性和方法。