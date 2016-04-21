var http = require('http');

var options = {
    host: 'www.sina.com',
    port: '80',
    path: '/'
};

http.get(options, function (res) {
    if (res.statusCode === 200) {
        console.log('the site is up');
    }
    else {
        console.log('the site is down');
    }
}).on('error', function (e) {
    console.log('there was an error: ' + e.message);
});