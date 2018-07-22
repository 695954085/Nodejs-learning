var Writable = require('stream').Writable;
var ws = Writable();
ws.setDefaultEncoding('utf-8')
ws._write = function (chunk, enc, next) {
    console.dir(chunk.toString());
    next();
};

process.stdin.pipe(ws);