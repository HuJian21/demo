var url = require('url');

var requestUrl = 'http://example.com:1234/pathname?query=string=string#hash';
var hostname = url.parse(requestUrl).hostname;
var pathname = url.parse(requestUrl).pathname;
var port = url.parse(requestUrl).port;
console.log(hostname);
console.log(port);
console.log(pathname);