const fetchCombinedData = require('../lib/fetch-combined-data.js')

const main = async () => {
  console.time('Completed in')

  const data = await fetchCombinedData()

  console.log(JSON.stringify(data))

  console.log('\n')
  console.timeEnd('Completed in')
}

main().catch(console.error)
