const Writable = require('stream').Writable;
const fs = require('fs');

const ws = fs.createWriteStream('text.txt')
ws.write('xxx');
