const fetchCombinedData = require('../lib/fetch-combined-data.js')
const shuffle = require('../lib/shuffle')

const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV

router.get('/', async (req, res, next) => {
  const items = await fetchCombinedData()
  const shuffledItems = shuffle(items)
  const firstFiveShuffledItems = shuffledItems.slice(0, 5)

  const title = `High Fives${env === 'development' ? ' | 🚧 DEV MODE' : ''}`

  res.render('index', { title, items: firstFiveShuffledItems})
});

module.exports = router;
