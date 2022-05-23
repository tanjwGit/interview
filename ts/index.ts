export default {};

// 函数声明

function fn<T>(a: T): T {
  return a;
}

function createArr<T>(len: number, initValue: T): Array<T> {
  return new Array(len).fill(initValue);
}

const fn1: <T>(a: T) => T = (a) => { return a; }
const fn2 = <T>(a: T): T => { return a; }
const createArr1: <T>(len: number, initValue: T) => Array<T> = (len, initValue) => (new Array(len).fill(initValue))


// ReturnType 原理
type MyReturnType<T extends (...args: any) => any> =
  (
    T extends (...args: any) => infer R ? R : any
  )

type add = (a: number, b: number) => string
type sum = number
type addReturnType = MyReturnType<add>
// type sumType = MyReturnType<sum>


// interface 继承
interface Dog {
  name: string;
}

interface Cat extends Dog {
  age: number;
}

const cat: Cat = {
  name: '',
  age: 1
}

