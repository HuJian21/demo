var http = require('http');
var urls = require('url');
var util = require('util');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(util.inspect(urls.parse(req.url,true)));
}).listen(3000);