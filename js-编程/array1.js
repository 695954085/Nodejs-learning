function indexOf(arr, item) {
  let index = arr.findIndex((value)=>{
      return value === item
  })
  return index;
}

console.log(indexOf([ 1, 2, 3, 4 ], 19))