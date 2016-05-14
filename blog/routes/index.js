var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var setting = require('../setting');

var User = require('../models/user');

/* GET home page. */
exports.index = function (req, res) {
    res.render('index', {title: 'my blog'});
}

exports.user = function (req, res) {
    res.render('user', {title: 'my blog'});
}

exports.post = function (req, res) {
    res.render('post', {title: 'my blog'});
}

exports.reg = function (req, res) {
    res.render('reg', {title: '注册页面'});
}

exports.doReg = function (req, res) {
    if (req.body['password-repeat'] != req.body['password']) {
        // console.log('11');
        res.render('reg', {message: '密码输入不一致，请检查后重试！'});
        return res.redirect('/reg');
    }
    
    // 对密码进行加密
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    var newUser = new User({
        name: req.body.username,
        password: password
    });
    
    User.find(newUser.name, function (err, user) {
        if (user) {
            res.render('reg', {message: '该用户已存在'});
            return res.redirect('/reg');
        }
        else {
            newUser.save(function (err) {
                if (err) {
                    // req.session.err = err;
                    return res.redirect('/reg');
                }
                // req.session.user = newUser;
                res.render('reg', {message: '注册成功！'});
                res.redirect('/');
                // console.log('注册成功');
            })
        }
    })
    // res.render('doReg', {title: 'my blog'});
}

exports.login = function (req, res) {
    res.render('login', {title: '登录页面'});
}

exports.doLogin = function (req, res) {
    res.render('doLogin', {title: 'my blog'});
}

exports.logout = function (req, res) {
    res.logout('index', {title: 'my blog'});
}



