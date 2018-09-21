// const filter = (f, ar) =>
//   arr.reduce((acc, val) => (f(val) && acc.push(val), acc), []);

// const app = (f, arr) => arr.reduce((acc, val) => (acc.push(f(val)), acc), []);

// const filter = f => reducer => (acc, value) => {
//   if(f(value)) return reducer(acc, value);
//   return acc;
// }

// const map = f => reducer => (arr, value) => reducer(arr, f(value))

// const pushReducer = (acc, value) => (acc.push(value), acc);

// const isEven = num => num % 2 === 0;
// const triple = num => num * 3;

// const pipe = (...fns) => (...args) => fns.reduce((fx, fy) => fy(fx), ...args);

// [1,2,3,4,5].reduce(
//   pipe(
//     filter(isEven),
//     map(triple)
//   )(pushReducer),
//   []
// );
// console.log([1,2,3,4].reduce(map(triple)(filter(isEven)(pushReducer)), []))

// console.log(map(triple)(filter(isEven)(pushReducer)))

const filter = function(fn) {
  return function(reducer) {
    return function(acc, value) {
      if (fn(value)) {
        return reducer(acc, value)
      }
      return acc
    }
  }
}

const map = function(fn) {
  return function(reducer) {
    return function(acc, value) {
      return reducer(acc, fn(value))
    }
  }
}
const isEven = num => num % 2 === 0
const triple = num => num * 3

// const pipe = (...fns) => (...args) => fns.reduce((fx, fy) => fy(fx), ...args);

const pipe = function(...fns) {
  return function(...args) {
    return fns.reduce((fx, fy) => {
      return fy(fx)
    }, ...args)
  }
}

[1,2,3,4].reduce(map(triple)(filter(isEven)(pushReducer)), [])
[1,2,3,4].reduce(pipe(filter(isEven),map(triple))(pushReducer),[]);