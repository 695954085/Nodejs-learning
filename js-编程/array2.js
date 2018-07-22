function sum(arr) {
  let sum = 0;
  arr.forEach(function(value){
      sum += parseInt(value);
  })
  return sum;
}

console.log(sum([1,2,3,4]))