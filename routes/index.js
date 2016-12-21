var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cerebro - Sound' });
});

/* GET timeline page. */
router.get('/sound', function(req, res, next) {
  res.render('cover', { title: 'Cerebro - Sound' });
});

module.exports = router;
