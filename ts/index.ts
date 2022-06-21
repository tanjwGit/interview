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




type A = {
  [key: string]: number
}




// Extract < Union1, Union2 >
// Exclude < T, U >
// Pick < T, K >
// Omit < Type, Keys >
// Partial < T >
// Required < Type >
// Record < Keys, Type >
// Readonly < T >
// ReturnType < T >
// Parameters < T >




