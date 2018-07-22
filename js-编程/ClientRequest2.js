const http = require('http')

const server = http.createServer()
server.on('request', function (req, res) {
  res.end('hahha')
})
server.on('connect', function (req, socket, head) {
  console.log(req.headers)
})
server.listen(8080, function () {
  http.request({
    host: '127.0.0.1',
    port: 8080,
    method: 'CONNECT'
  }, res => {
    res.setEncoding('utf-8')
    res.on('data', function (str) {
      console.log(str)
    })
  }).end()
})
