const http = require('http');
const net = require('net');
const url = require('url');
const fs = require('fs');


// 创建一个 HTTP 代理服务器
const proxy = http.createServer((req, res) => {
  console.log("http服务器连接成功");
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, cltSocket, head) => {
  pc1 = cltSocket
  // 连接到一个服务器
  const srvUrl = url.parse(`http://${req.url}`);
  const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
    console.log(new Date().getMilliseconds() + " srvSocket联通")
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
      'Proxy-agent: Node.js-Proxy\r\n' +
      '\r\n');
    srvSocket.write(head);
    // srvSocket.on('pipe', function (src) {
    //   console.log(`srvSocket: \r\n${src}`)
    //   console.log(new Date().getMilliseconds() + ': 优势局正通过管道流入写入器A');
    // })
    // cltSocket.on('pipe', function (src) {
    //   console.log(`cltSocket接收: \r\n${src}`)
    //   console.log(new Date().getMilliseconds() + ': 优势局正通过管道流入写入器B');
    // })
    cltSocket.on('data',function(chunk){
      console.log(`cltSocket接收到数据: \r\n${chunk.toString()}`)
    })
    srvSocket.setEncoding('utf-8')
    srvSocket.on('data',function(chunk){
      console.log(`srvSocket接收到数据: \r\n${chunk.toString()}`)
    })

    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
});

// 代理服务器正在运行
proxy.listen(1337, '127.0.0.1', () => {

  // 发送一个请求到代理服务器
  const options = {
    port: 1337,
    hostname: '127.0.0.1',
    method: 'CONNECT',
    path: 'nodejs.cn:80'
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    socket.on('pipe',function(src){
      console.log(`socket: \r\n${src}`)
    })
    console.log(new Date().getMilliseconds() + ': 已连接！');
    // socket.on('pipe', function (src) {
    //   console.log(new Date().getMilliseconds() + "  有数据正通过管道流入写入器C")
    // })
    var ws = fs.createWriteStream('text.txt');
    socket.pipe(ws)
    // 通过代理服务器发送一个请求
    socket.write('GET / HTTP/1.1\r\n' +
      'Host: nodejs.cn:80\r\n' +
      'Connection: keep-alive\r\n' +
      '\r\n', function () {
        console.log(new Date().getMilliseconds() + " socket缓存数据输出");
      });
    // socket.end()
    socket.on('data', (chunk) => {
      console.log(`socket接收到数据: \r\n${chunk.toString()}`)
    });
    socket.on('end', () => {
      proxy.close();
    });

    

    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        socket.write('GET / HTTP/1.1\r\n' +
        'Host: nodejs.cn:80\r\n' +
        'Connection: keep-alive\r\n' +
        '\r\n')
        // process.stdout.write(`data: ${chunk}`);
      }
    });
  });
});