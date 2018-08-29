const scrapeFoundryPageForData = require('../lib/scrape-foundry-page-for-Data.js')

const main = async () => {
  console.time('Completed in')

  const data = await scrapeFoundryPageForData('https://seesparkbox.com/foundry/github_vs_gitlab_vs_bitbucket')

  console.log(data)

  console.log('\n')
  console.timeEnd('Completed in')
}

main().catch(console.error)
