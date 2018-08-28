const getGoogleAnalyticsData = require('./lib/get-google-analytics-data')
const scrapeFoundryPageForAuthor = require('./lib/scrape-foundry-page-for-author.js')
const scrapeDataFromTeamPage = require('./lib/scrape-data-from-team-page.js')

const baseUrl = "https://seesparkbox.com/foundry"

const reformatGoogleAnalyticsData = (googleAnalyticsData) => {
  const analyticsData = googleAnalyticsData.data.rows.map(dataArray => {
    const [relativeUrl, views] = dataArray

    return {
      url: `${baseUrl}${relativeUrl}`,
      views,
    }
  })

  return Promise.all(analyticsData.map(addNamesToGoogleAnalyticsData))
}

const addNamesToGoogleAnalyticsData = async (obj) => {
  try {
    const { author } = await scrapeFoundryPageForAuthor(obj.url)
    const hydratedObj = {...obj, author}

    return hydratedObj
  } catch (error) {
    console.log(`${error}: ${obj.url}`)
    return obj
  }
}

const main = async () => {
  const teamDataPromise = scrapeDataFromTeamPage()
  const googleAnalyticsDataPromise = getGoogleAnalyticsData().then(reformatGoogleAnalyticsData)

  Promise.all([teamDataPromise, googleAnalyticsDataPromise]).then(values => {
    const [ teamData, googleAnalyticsData ] = values

    const finalData = googleAnalyticsData.map(item => {
      return { ...item, author: teamData.find(member => member.fullName === item.author) }
    })

    return finalData
  })
}

main().catch(console.error)
