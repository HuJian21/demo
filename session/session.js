// var express = require('express');
// var session = require('express-session');
// var app = express();

// app.use(session({
//     secret: 'hudas app',
//     cookie: {maxAge: 60 * 1000 * 30}
// }));

// app.get('/', function (req, res) {
//     if (req.session.sign) {
//         console.log(req.session);
//         res.send('Welcome<strong>' + req.session.name + '</strong>,欢迎您');
//     }
//     else {
//         req.session.sign = true;
//         req.session.name = 'Jian';
//         res.send('欢迎登录');
//     }
// });

var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/hubwiz');
mongoose.connection.on('open', function () {
    console.log('连接成功');
});

app.use(session({
    secret: 'nihao wadafefe',
    cookie: {maxAge: 60 * 1000 * 60 * 24 * 14},
    resave: true,
    saveUninitalized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.get('/', function (req, res) {
    if (req.session.sign) {
       console.log(res.session);
       res.send('welcome <strong>' + req.session.name + '</strong>');
    }
    else {
        req.session.sign = true;
        req.session.name = 'Jian';
        res.send('欢迎登录');
    }
})


app.listen(3000, function () {
    console.log('app.js running at port 3000');
})