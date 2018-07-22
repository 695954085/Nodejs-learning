const { Duplex } = require('stream');
const kSource = Symbol('source');
const fs = require('fs')

class MyDuplex extends Duplex {
  constructor(source, options) {
    super(options);
    this[kSource] = source;
  }

  _write(chunk, encoding, callback) {
    // The underlying source only deals with strings
    if (Buffer.isBuffer(chunk))
      chunk = chunk.toString();
    this[kSource].writeSomeData(chunk);
    callback();
  }

  _read(size) {
    this[kSource].fetchSomeData(size, (data, encoding) => {
      if (data == 'null') {
        this.push(null)
      }else{
        this.push(Buffer.from(data, encoding));
      }
    });
  }
}

class source {
  constructor() {
    this.c = 97 - 1;
  }

  writeSomeData(chunk) {
    console.log(new Date() + ` ,写入数据: ${chunk}`)
  }

  fetchSomeData(size, callback) {
    if (this.c >= 'z'.charCodeAt(0)) return callback('null', 'utf-8');
    callback(String.fromCharCode(++this.c), 'utf-8')
  }
}

var d = new MyDuplex(new source);

// const ws = fs.createWriteStream('text.txt');

// d.pipe(ws)

const rs = fs.createReadStream('text.txt')
rs.pipe(d)