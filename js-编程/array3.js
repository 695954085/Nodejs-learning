function remove(arr, item) {
  return arr.filter(value=>{
    return value !== item
  }) 
}

console.log(remove([1,2,3,4,2],2));
