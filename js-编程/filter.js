const arr = [3, 4, 5, 2, 3, undefined, null, 0, '']
console.log(arr.filter(Boolean))

const num1 = [3, 4, 5, 6, 7]
const num2 = [43, 23, 5, 67, 87, 3, 6]

const zipWith = f => (xs, ys) => {
  if (xs.length === 0 || ys.length === 0) return []
  const [xHead, ...xTail] = xs
  const [yHead, ...yTail] = ys
  return [f(xHead, yHead), ...zipWith(f)(xTail, yTail)]
}

const add = (x, y) => x + y

console.log(zipWith(add)(num1, num2))


const filter = (f, arr) =>
  arr.reduce((acc, val) => (f(val) && acc.push(val), acc), []);


 let nArr =  arr.map((value, index) => {
    return (value, index)
  })

  console.log(nArr)