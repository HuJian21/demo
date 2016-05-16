var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.status(200).send('Welcome!');
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('socket running');
});

server.listen(4000, function () {
    console.log('app.js running at port 4000');
});