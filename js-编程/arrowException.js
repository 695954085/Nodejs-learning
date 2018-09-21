const fs = require('fs')
try {
  fs.readFile('./a.txt', (err, data) => {
    if (err)
      throw err
    console.log(data.toString())
  })
} catch (err) {
  console.log('xxx');
  
  console.log(err);
}