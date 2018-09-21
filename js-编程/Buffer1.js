const str = 'Node.js';
const buf = Buffer.allocUnsafe(str.length);

for (let i = 0; i < str.length; i++) {
  console.log(str.charCodeAt(i))
  buf[i] = str.charCodeAt(i);
}
console.log(buf);
console.log(buf.toString());

// 输出: Node.js
console.log(buf.toString('ascii'));