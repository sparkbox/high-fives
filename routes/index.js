const fs = require('fs');
const express = require('express');
const shuffle = require('../lib/shuffle')
const fetchCombinedData = require('../lib/fetch-combined-data')
const router = express.Router();
const env = process.env.NODE_ENV

const getData = (shouldBeFresh) => {
  if (shouldBeFresh) {
    return fetchCombinedData()
  }

  return new Promise((resolve, reject) => {
    fs.readFile('./fetched-data/fetched-data.json', 'utf8', (err, data) => {
      err ? reject(err) : resolve(JSON.parse(data));
    })

  })
}

const mixData = (postAnalyticsData, messageData) => {
  // This mixes our set of data into
  // a nice little salad of happiness
  //
  // First it shuffles then the individual arrays' items.
  // Then it merges the two arrays by alternating through
  // the items, merging them into one list.
  //
  // Right now it only supports mixing two lists.
  // It's also pretty poorly written.

  const arrA = shuffle([...postAnalyticsData])
  const arrB = shuffle([...messageData])
  const arrArr = [arrA, arrB]
  const limit = arrArr.reduce((a, b) => a + b.length, 0)
  const mixedData = []

  for (let i = 0; i < limit; i++) {
    const nextItem = arrArr[i % 2].shift()

    if (nextItem) {
      mixedData.push(nextItem)
    } else {
      const nextNextItem = arrArr[(i+1) % 2].shift()
      if (nextNextItem) {
        mixedData.push(nextNextItem)
      }
    }
  }

  return mixedData
}

router.get('/', async (req, res, next) => {
  const fresh = req.query.fresh
  const { data, fetchedAt } = await getData(fresh)
  const { postAnalyticsData, messageData } = data

  const typedPostAnalyticsData = postAnalyticsData.map(i => { return {
    ...i,
    type: "analytics"
  }})
  const typedMessageData = messageData.map(i => { return {
    ...i,
    type: "message"
  }})

  const mixedData = mixData(typedPostAnalyticsData, typedMessageData)
  const firstFewMixedItems = mixedData.slice(0, 10)

  const title = `High Fives`

  res.render('index', { title, items: firstFewMixedItems, fetchedAt})
});

module.exports = router;
