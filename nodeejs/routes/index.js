var express = require('express');
var router = express.Router();

/* GET home page. */
var ele = {
  title: 'testExpress1',
  test: '测试测试'
}
router.get('/', function(req, res, next) {
  res.render('index', ele);
});

module.exports = router;
