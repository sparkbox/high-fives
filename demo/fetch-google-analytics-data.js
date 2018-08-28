const getGoogleAnalyticsData = require('../lib/get-google-analytics-data')

const main = async () => {
  console.time('Completed in')

  const data = await getGoogleAnalyticsData()

  console.log(data)

  console.log('\n')
  console.timeEnd('Completed in')
}

main().catch(console.error)
