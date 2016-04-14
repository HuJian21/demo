var http = require('http');
var url = require('url');

function start(route) {
    function onRequest(req,res) {
        var pathName = url.parse(req.url).pathname;
        console.log('Request for ' + pathName + ' recived!');
        
        route(pathName);
        
        res.writeHead(200,{'Content-Type': 'Text/plain'});
        res.write('Hello World');
        res.end();
    }
    http.createServer(onRequest).listen(3000);
    console.log('Server has started');
};

exports.start = start;