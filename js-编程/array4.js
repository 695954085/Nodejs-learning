function removeWithoutCopy(arr, item) {
  let length = arr.length
  for(var i=0;i<length;i++){
    if(arr[i] === item){
      arr.splice(i,1)
      i--
    }
  }
  return arr
}
console.log(removeWithoutCopy([1, 2, 2, 3, 4, 2], 2));
