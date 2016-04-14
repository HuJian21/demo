var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');

var url = require('url');
var cNodeUrl = 'https://cnodejs.org/';

var app = express();

app.get('/', function (err, res) {
    superagent.get(cNodeUrl).end(function (err,res) {
        if (err) {
            return console.error(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        
        // 获取首页链接
        $('#topic_list .topic_title').each(function (index, element) {
            var $element = $(element);
            var href = url.resolve(cNodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });
        
        console.log(topicUrls);
        // res.send(topicUrls);
        var eq = new eventproxy();
        eq.after('topic_html', topicUrls.length, function (topics) {
            topics = topics.map(function (topicPair) {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim()
                });
                console.log('final:');
                console.log(topics);
            });
        });
        
        // var topicUrls = [];
        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl).end(function (err, res) {
                console.log('fetch ' + topicUrl + ' successful');
                eq.emit('topic_html',[topicUrl,res.text]);
            });
        });
    });
});

app.listen(3000,function () {
    console.log('app is running at port 3000');
});

