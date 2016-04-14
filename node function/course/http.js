var http = require('http');
http.createServer(function (req,res) {
    res.writeHead(200, {"Content-Type": "Text/plain"});
    res.write('hello world');
    res.end();
}).listen(3000);