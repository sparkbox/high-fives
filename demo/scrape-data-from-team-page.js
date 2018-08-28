const scrapeDataFromTeamPage = require('../lib/scrape-data-from-team-page.js')

const main = async () => {
  console.time('Completed in')

  const data = await scrapeDataFromTeamPage()

  console.log(data)

  console.log('\n')
  console.timeEnd('Completed in')
}

main().catch(console.error)
