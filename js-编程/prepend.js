function prepend(arr, item) {
  let nArr = arr.concat([])
  nArr.unshift(item)
  return nArr
}

console.log(prepend([1,2,3,4],10));
