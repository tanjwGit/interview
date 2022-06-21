### 什么是typescript
TS是一个强类型的JavaScript超集，支持所有JS已有语法，支持面向对象编程的概念，如：类、接口、继承、泛型等。TS并不直接在浏览器上运行，需要编译成JS来运行

### keyof和typeof等关键字的作用
  - keyof
    - 索引类型查询操作符
    - 获取索引类型的属性名，构成联合类型。
      - 相当于取到 interface 内所有的属性key,构成联合类型
  - in
    - 遍历枚举类型
    - 遍历联合类型
      - 一般 `K in keyof {a: number}`
    - 用于判断一个属性/方法是否属于某个对象
  - typeof
    - 获取一个变量或对象的类型


  - extends : 约束泛型的取值范围

### implements与extends的区别
  - extends 
    - 子类会继承父类的所有属性和方法
    - 用在范性中表示 泛型约束
  - implements
    - 使用该关键字的类将需要实现的需要实现的类的所有属性和方法。

### interface和type的区别
  - 相同点:
    - 都可以定义一个对象或者函数
    - 都允许继承
  - 不同点:
    - interface
      - 接口，用于定于对象类型，对对象的形状进行描述
      - 只能声明对象或者函数
      - 会合并多个同名的 interface 声明
      - `interface` 和 `extends` 结合，约束泛型;

    - type
      - 类型别名，给各种类型定义别名，让书写更简洁、清晰;
      - 可以声明 基本类型、联合类型、交叉类型、元组、范型工具函数等
  - 不应该将 type 与 interface 进行比较。是完全不同的概念
  - 只是两者有时都能实现同样的功能，才会经常被混淆
  - 一般使用 `组合` 或者 `交叉类型` 的时候，用 `type`
  - 一般用类的 `extends` 或 `implements` 时，用 `interface`




### unknown any 的区别？如何判断类型 安全？
  - 区别
    - unknown 可以保证类型安全
    - any 会彻底放弃类型检查
    - 需要缩小类型，才能 对 unknown 类型执行操作
  - 如何缩小类型？ 类型安全
    - 类型断言 as
    - 类型收缩 typeof、instanceof、in
    - 双重断言 as unknown as Boolean

### infer
  - 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用
  - 如 returnType 的实现


### 泛型
  - 泛型是指在定义函数、接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型。
  - 好处
    - 让函数或者类支持多种类型，增强扩展性

### 一些内置范性函数的作用
  - [Pick<T, K>](./index.md#Pick)
    - 从类型 T 中，选出属性 K, 构成一个新的类型
  - Readonly<T>
    - 接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 readonly 所修饰。
    - 即 不能对属性key 赋值
  - Exclude<T, U>
    - 从 联合类型T 中排除 U 的成员，返回一个新的类型
    - 举例解释
      - `type A = Exclude<'a' | 'b', 'a'>` A = 'b'
      - `type A = Exclude<'a' | 'b', 'c'>` A = 'a' | 'b'
      - `type A = Exclude<'a' | 'b', 'a' | 'b'>` A = never
  - Parameters<T>
    -  获得 函数类型 T 的参数 组成的 元组类型
  - ReturnType<T>
    - 获得函数的返回值类型




  - Omit<T, K>忽略T中的某些属性.
  - Merge<O1, O2>将两个对象的属性合并.
  - Compute<A & B>将交叉类型合并.
  - Intersection<T, U>取T的属性，此属性同样哦存在于U.
  - Overwrite<T, U>用U的属性覆盖T的相同属性.

## 内置范性的实现

  ```ts
    interface A {
      a: string
      b: string
      c: number
    }
    interface B {
      name: string
    }
  ```

 ### Pick
  - 实现
    ```ts
      type MyPick<T, K extends keyof T> = {
        [P in K]: T[P]
      }

      type A1 = MyPick<A, 'a' | 'b'>
    ```
    - [P in K]的意思是将K中的key遍历出来，赋予P。
    - T[P]的意思是将T中对应的key === P的值取出来

  - 结果
    ```ts
      A1 = {
        a: string
        b: string
      }
    ```

### Readonly
  - 实现
    ```ts
      type MyReadonly<T> = {
        readonly [P in keyof T]: T[P]
      }
    ```
    - 使用readonly关键字声明属性是只读属性
    - 使用keyof T取出泛型T中的所有key，再用in遍历
### Exclude
  - 实现
    ```ts
      type MyExclude<T, U> = T extends U ? never : T
    ```
      - 
### Parameters
  - 实现
    ```ts
    type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P: never
    ```
    - 使用 infer P 指代参数列表
### ReturnType
  - 实现
  ```ts
    type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
  ```


