var express = require('express');
var router = express.Router();

/* Download Excel */
router.get('/data', function(req, res, next) {
  res.send('Download Excel');
});

module.exports = router;
