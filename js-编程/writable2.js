const fs = require('fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!', function () {
  console.log('hahah');
});
file.on('finish', function () {
  console.log('xxx');
})

