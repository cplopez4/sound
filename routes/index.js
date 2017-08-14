var express = require('express');
var router = express.Router();

/* GET Viz */
router.get('/', function(req, res, next) {
	res.setLocale('es');
  	res.render('index', { title: 'Historias por Default' });
});

/* GET Viz in English */
router.get('/en', function(req, res, next) {
	res.setLocale('en');
  	res.render('index', { title: 'Default Stories' });
});

/* GET Viz in Spanish */
router.get('/es', function(req, res, next) {
	res.setLocale('es');
  	res.render('index', { title: 'Historias por Default' });
});

module.exports = router;
