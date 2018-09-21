// let bar;

// function someAsyncApiCall(callback) {
//   process.nextTick(callback);
// }

// someAsyncApiCall(() => {
//   console.log('bar', bar); // 1
// });

// bar = 1;

let bar;

function someAsyncApiCall(callback) {
  // process.nextTick(callback);
  callback()
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;