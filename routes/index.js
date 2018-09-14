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

const mixData = (postAnalyticsData, messageData) => {
  // This mixes our set of data into
  // a nice little salad of happiness
  //
  // It merges the two arrays by alternating through
  // the items, merging them into one list.
  //
  // Right now it only supports mixing two lists.

  const arrA = [...postAnalyticsData]
  const arrB = [...messageData]
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

  // console.log(mixedData)
  // return postAnalyticsData
  return mixedData
}

router.get('/', async (req, res, next) => {
  const { data, fetchedAt } = await getData()
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
  const firstFiveShuffledItems = mixedData.slice(0, 5)

  const title = `High Fives`

  res.render('index', { title, items: firstFiveShuffledItems, fetchedAt})
});

module.exports = router;
