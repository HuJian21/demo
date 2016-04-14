var express = require('express');
var app = express();

app.get('/', function (err, res) {
    if (err) throw err;
    var url = require('url');
    var parsedUrl = url.parse('http://www.baidu.com');
    res.send(JSON.stringify(parsedUrl));
    console.log(res.send(JSON.stringify(parsedUrl)));    
});
app.listen(3000, function () {
    console.log('app is running at port 3000');
})