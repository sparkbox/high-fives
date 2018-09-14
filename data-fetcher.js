// Hi! I'm a script that runs on a loop and downloads
// new data in intervals. I keep the data fresh,
// and prevent us from needing to request it
// when users load the app. This keeps things
// running nice and speedy! 🏃‍
//
// I'm meant to be run in paralell with the
// express app.

require('dotenv').config()

const fs = require('fs')
const colors = require('colors')
const mkdirp = require('mkdirp')
const { performance } = require('perf_hooks')
const fetchCombinedData = require('./lib/fetch-combined-data.js')
const CronJob = require('cron').CronJob;

const dataDir = 'fetched-data'
const dataFileName = 'fetched-data.json'
const fullFilePath = `./${dataDir}/${dataFileName}`
const everyNMinutes = 10

const makeDataDir = (data) => {
  return new Promise((resolve, reject) => {
    mkdirp(dataDir, (err) => {
      err ? reject(err) : resolve()
    })
  })
}

const writeFile = async (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fullFilePath, data, 'utf8', (err, data) => {
      err ? reject(err) : resolve()
    })

  })
}

const fetchAndSaveData = async () => {
  const startTime = performance.now()
  const combinedData = await fetchCombinedData()

  await makeDataDir()
    .then(() => writeFile(JSON.stringify(combinedData)))

  const endTime = performance.now()

  console.log(`Fetched and saved ${fullFilePath.blue} in ` + `${Math.round(endTime - startTime)}ms`.magenta + ` at ${Date.now().toString().gray}`)
}

new CronJob(`0 */${everyNMinutes} * * * *`, fetchAndSaveData, null, true, 'America/New_York', {}, true);
