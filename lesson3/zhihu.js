var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var ithome = express();


ithome.get('/', function (req,res,next) {
    superagent.get('http://www.ithome.com/').end(function (err,sres) {
            if (err) {
                return next(err);
            }
            
            var $ = cheerio.load(sres.text);
            var items = [];
            
            $('.lst-1 .new .title a').each(function (index, element) {
                var $element = $(this);
                items.push({
                    title: $element.html(),
                    href: $element.attr('href')
                });
            });
            
            $('.bx2 a').each(function (index, element) {
                var $element = $(this);
                items.push({
                    blogroll: $element.html() 
                });
            });
            
            res.send(items);
    });
});

ithome.listen(3000, function () {
    console.log('zhihu is running at port 3000');
});