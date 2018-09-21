// const buf1 = Buffer.allocUnsafe(26);

// for (let i = 0; i < 26; i++) {
//   // 97 是 'a' 的十进制 ASCII 值 
//   buf1[i] = i + 97;
// }

// const buf2 = buf1.slice(0, 3);

// // 输出: abc
// console.log(buf2.toString('ascii', 0, buf2.length));

// buf1[0] = 33;

// // 输出: !bc
// console.log(buf2.toString('ascii', 0, buf2.length));

const buf = Buffer.from('buffer');

// console.log(buf[5]);

// 输出: buffe
// (相当于 buf.slice(0, 5))
console.log(buf.slice(0, 5).toString());

console.log(buf.slice(-6, -1).toString());

// 输出: buff
// (相当于 buf.slice(0, 4))
console.log(buf.slice(-6, -2).toString());

// 输出: uff
// (相当于 buf.slice(1, 4))
console.log(buf.slice(-5, -2).toString());