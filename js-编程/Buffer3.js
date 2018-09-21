let buf = Buffer.allocUnsafe(10);

buf.write('abcdefghj', 0, 'ascii');

// 输出: 10
console.log(buf.length);

buf = buf.slice(0, 5);

// 输出: 5
console.log(buf.length);