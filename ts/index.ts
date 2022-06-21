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






type Required<T> = {
  [P in keyof T]-?: T[P]
}


type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}


type Exclude<T, U> = T extends U ? never : T;


type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type A = {
  [key: string]: number
}

// ReturnType 原理
type ReturnType<T extends (...args: any[]) => any> =
  (
    T extends (...args: any[]) => infer R ? R : any
  )












