function append(arr, item) {
  let itemArr = Array.of(item)
  return arr.concat(itemArr)
}

console.log(append([1,2,3,4],10));
