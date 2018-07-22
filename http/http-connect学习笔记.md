以下是nodejs.cn，http模块讲解的示例代码
```
const http = require('http');
const net = require('net');
const url = require('url');

// 创建一个 HTTP 代理服务器
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, cltSocket, head) => {
  // 连接到一个服务器
  const srvUrl = url.parse(`http://${req.url}`);
  const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
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
    path: 'www.google.com:80'
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('已连接！');

    // 通过代理服务器发送一个请求
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});
```
我不了解socket,cltSocket,srvSocket的数据流向？
cltSocket，是不是有两个消费端，分别是socket，srvSocket？

----

- socket.write(chunk) , 不想fs的writeStream一样直接往资源里面写入数据，而是直接写个远端的cltSocket，![1532253862(1).png](http://dn-cnode.qbox.me/Fnoh3GseaLWL5e0hOd-QD-1vbnSZ)

- 远端的cltSocket接受到了数据，触发net.js 的onread方法。cltSokcet接收到socket的chunk之后，触发了`cltSocket.pipe(srvSocket)`绑定的data事件![1532254492(1).png](http://dn-cnode.qbox.me/FhGVbhtvvnMeNeACF1HI-xhAXSwI)

- `dest.write(chunk)` dest 正好就是srvSocket，write方法把数据发送到远端
-  srvSocket重复步骤2，3过程
-  socket收到cltSocket.write过来的数据