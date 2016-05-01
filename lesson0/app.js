var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, {'content-Type': 'text/html'});
	res.write('<h1>Hello Node.Js  这是用supervisor启动的</h1>');
	res.end();
}).listen(3000, function () {
	console.log('Node is running at port 3000');
});
