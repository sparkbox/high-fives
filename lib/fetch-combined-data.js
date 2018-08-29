const fetchGoogleAnalyticsData = require('./fetch-google-analytics-data')
const scrapeFoundryPageForData = require('./scrape-foundry-page-for-data.js')
const scrapeDataFromTeamPage = require('./scrape-data-from-team-page.js')

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
    const { author, title } = await scrapeFoundryPageForData(obj.url)
    const hydratedObj = {...obj, author, title}

    return hydratedObj
  } catch (error) {
    console.log(`${error}: ${obj.url}`)
    return obj
  }
}

const fetchCombinedData = async () => {
  const teamDataPromise = scrapeDataFromTeamPage()
  const googleAnalyticsDataPromise = fetchGoogleAnalyticsData().then(reformatGoogleAnalyticsData)

  return Promise.all([teamDataPromise, googleAnalyticsDataPromise]).then(values => {
    const [ teamData, googleAnalyticsData ] = values

    const finalData = googleAnalyticsData.map(item => {
      return { ...item, author: teamData.find(member => member.fullName === item.author) }
    })

    return finalData
  })
}

module.exports = fetchCombinedData
