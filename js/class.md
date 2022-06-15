## new 关键字
- new是从构造函数生成实例对象的命令
- ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数
- 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的

- 所以可以实现 一个函数不能使用 new 关键字的代码， Symbol
  ```js
    function Symbol() {
      if (new.target) {
      throw new Error('Symbol is not a constructor');
      } else {
      return {};
      }
    }
  ```

- 或者只能 当作构造函数使用
- 比如class 只能通过 new 命令使用


- 还可以写出不能独立使用、必须继承后才能使用的类
  ```js
    class Shape {
      constructor() {
        if (new.target === Shape) {
          throw new Error('本类不能实例化');
        }
      }
    }

    class Rectangle extends Shape {
      constructor(length, width) {
        super();
        // ...
      }
    }

    var x = new Shape();  // 报错
    var y = new Rectangle(3, 4);  // 正确
  ```



## super 函数 或 super 对象
  - super 可以表示父类的构造函数，用来新建一个父类的实例对象
    - ES6 规定，子类必须在constructor()方法中调用super()，否则就会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用super()方法，子类就得不到自己的this对象

    - 除了私有属性，父类的所有属性和方法，都会被子类继承，其中包括静态方法
    - 子类无法继承父类的私有属性，或者说，私有属性只能在定义它的 class 里面使用


    - super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)
    - 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错

  - super作为对象时
    - 在普通方法(包括构造函数)中，指向父类的原型对象；`super => fu.prototype`
    - 在静态方法中，指向父类 `super => fu`
    - 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的
      - 即： 父类内定义的箭头函数，无法通过 super 访问，因为肩头函数挂载在this上;

  - 使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错
    - 例如： `console.log(super)`

  - 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字
    ```js
    var obj = {
      toString() {
        return "MyObject: " + super.toString();
      }
    };

    obj.toString(); // MyObject: [object Object]
    ```


### 类的 prototype 属性和__proto__属性?
  - 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。
  - Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
    1. 子类的__proto__属性，表示`构造函数的继承`，总是指向父类
    2. 子类prototype属性的__proto__属性，表示`方法的继承`，总是指向父类的prototype属性

    ```js
      class A {
      }

      class B extends A {
      }

      B.__proto__ === A // true
      B.prototype.__proto__ === A.prototype // true


      // 是因为类的继承是按照下面的模式实现的
      class A {
      }

      class B {
      }

      // B 的实例继承 A 的实例
      Object.setPrototypeOf(B.prototype, A.prototype);

      // B 继承 A 的静态属性
      Object.setPrototypeOf(B, A);

      const b = new B();
      Object.setPrototypeOf = function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
      }
    ```
  - 这两条继承链，可以这样理解：
    - 作为一个对象，子类（B）的原型（__proto__属性）是父类（A）
    - 作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例

  - 扩展
    - ES5 原生构造函数无法被继承，比如myArray 继承 Array
    - 但 class 可以

    - 因为子类无法获得原生构造函数的内部属性
    -  而class 是先创建父类的实例对象，然后用子类的构造函数修饰 实例对象
    
    - 因为：es5“实例在前，继承在后”s。
    - es6: 即“继承在前，实例在后”
  - extends 关键字不仅可以用来继承类，还可以用来继承原生的构造函数

### 为什么子类的构造函数，一定要调用super()？
  - ES6 的继承机制，与 ES5 完全不同
    - ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。

    - ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例, 即“继承在前，实例在后”

    - 这意味着新建子类实例时，父类的构造函数必定会先运行一次

  - 在子类的构造函数中，只有调用super()之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，必须先完成父类的继承，只有super()方法才能让子类实例继承父类
  - 在访问“this”或从派生构造函数返回之前，必须在派生类中调用超级构造函数