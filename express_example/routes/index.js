var express = require('express');
var router = express.Router();

/* GET home page. */
var testRouter = {
  title: 'Express222',
  name: 'Jian',
  users: ['莎士比亚','托尔斯泰','陀思妥耶夫斯基','雨果']
}

exports.index = function (req, res) {
    res.render('index', testRouter);
}

exports.pcat = function (req, res) {
  res.render('pcat', testRouter);
}
