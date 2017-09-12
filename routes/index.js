var express = require('express');
var router = express.Router();

var jsonData = require('../data/data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express~~~', people: jsonData.people });
});

module.exports = router;
