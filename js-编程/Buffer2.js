// const arrayBuffer = new ArrayBuffer(16);
// const buffer = Buffer.from(arrayBuffer);

// console.log(buffer.buffer === arrayBuffer);

// console.log(buffer.buffer);
const buf = Buffer.alloc(1234);

// 输出: 1234
console.log(buf.length);

buf.write('some string', 0, 'ascii');

// 输出: 1234
console.log(buf.length);