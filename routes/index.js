const fetchCombinedData = require('../lib/fetch-combined-data.js')
const shuffle = require('../lib/shuffle')

var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  const items = await fetchCombinedData()
  const shuffledItems = shuffle(items)
  const firstFiveShuffledItems = shuffledItems.slice(0, 5)

  res.render('index', { title: 'High Fives', items: firstFiveShuffledItems})
});

module.exports = router;
