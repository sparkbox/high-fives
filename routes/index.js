const fs = require('fs');
const express = require('express');
const shuffle = require('../lib/shuffle')
const router = express.Router();
const env = process.env.NODE_ENV

const getData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./fetched-data/fetched-data.json', 'utf8', (err, data) => {
      err ? reject(err) : resolve(JSON.parse(data));
    })

  })
}

router.get('/', async (req, res, next) => {
  const { data, fetchedAt } = await getData()
  const shuffledData = shuffle(data)
  const firstFiveShuffledItems = shuffledData.slice(0, 5)

  const title = `High Fives`

  res.render('index', { title, items: firstFiveShuffledItems, fetchedAt})
});

module.exports = router;
