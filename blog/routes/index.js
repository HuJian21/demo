// var express = require('express');
// var router = express.Router();
var crypto = require('crypto');
var setting = require('../setting');

var User = require('../models/user');

/* GET home page. */
exports.index = function (req, res) {
    res.render('index', {
        title: 'my blog',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
}

exports.user = function (req, res) {
    res.render('user', {title: 'my blog'});
}

exports.post = function (req, res) {
    res.render('post', {title: 'my blog'});
}

exports.reg = function (req, res) {
    res.render('reg', {
        title: '注册页面',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
}

exports.doReg = function (req, res) {
    if (req.body['password-repeat'] != req.body['password']) {
        // console.log('11');
        req.flash('error', '两次输入的密码不一致!'); 
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
            req.flash('error', '用户已存在!');
            return res.redirect('/reg');
        }
        else {
            newUser.save(function (err) {
                if (err) {
                    req.session.err = err;
                    req.flash('error', err);
                    return res.redirect('/reg');
                }
                req.session.user = newUser;
                req.flash('success', '注册成功');
                res.redirect('/');
                // console.log('注册成功');
            })
        }
    })
}

exports.login = function (req, res) {
    res.render('login', {
        title: '登录页面',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
}

exports.doLogin = function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    User.find(req.body.username, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在!');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', '密码输入错误!');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
    })
}

exports.logout = function (req, res) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
}

exports.checkLogin = function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录');
        res.redirect('/login');
    }
    next();
}

exports.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录');
        res.redirect('back');
    }
    next();
}



