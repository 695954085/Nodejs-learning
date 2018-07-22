const { Readable } = require('stream');
const fs = require('fs')

class Counter extends Readable {
  constructor(opt) {
    super(opt);
    this._max = 1000000;
    this._index = 1;
  }

  _read() {
    const i = this._index++;
    if (i > this._max)
      this.push(null);
    else {
      const str = '' + i;
      const buf = Buffer.from(str, 'ascii');
      this.push(buf);
    }
  }
}
var c = new Counter

const ws = fs.createWriteStream('text.txt')

c.pipe(ws)