var http = require('http');
http.createServer(function (req, res) {
    // res.writeHead(301, {
    //     'Location': 'http://www.sina.com'
    // });
    // res.end();
}).listen(3001, '127.0.0.1');
console.log('server running at port 3001');