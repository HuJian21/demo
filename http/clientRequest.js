var http = require('http');
var querystring = require('querystring');
// 建立服务器
var app = http.createServer(function (req, res) {
    console.log('收到请求');
    var post = '';
    req.on('data', function (chunk) {
        post += chunk;
    });
    req.on('end', function () {
        post = querystring.parse(post);
        console.log('参数解析完成');
        res.end(post.age);
    });
});
app.listen(3000);

// 客户端请求
var contents = querystring.stringify({
    name: 'Jian',
    age: 22,
    address: 'SanYa'
});

// 声明请求参数
var options = {
    host: 'localhost',
    path: '/',
    port: 3000,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencodeed',
        'Content-Length': contents.length
    }
};

// 发送请求
var req = http.request(options, function (res) {
    res.setEncoding('utf-8');
    res.on('data', function (data) {
        console.log('后台返回数据');
        console.log(data);
    });
});
req.write(contents);
// 必须调用end
req.end();