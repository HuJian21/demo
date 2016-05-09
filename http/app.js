var app = require('http');
var server = app.createServer(function (req, res) {
    console.log(req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello Node.js!</h1>');
    res.end();
    console.log('http server');
});
server.listen(3000);
server.on('connection', function () {
    console.log('connection event was monitorring');
});
console.log('app.js running at port 3000!!!');