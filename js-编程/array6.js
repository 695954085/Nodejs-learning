function insert(arr, item, index) {
  let nArr = arr.concat([])
  nArr.splice(index, 0, item)
  return arr
}
console.log(insert([1, 2, 3, 4], 'z', 2));
