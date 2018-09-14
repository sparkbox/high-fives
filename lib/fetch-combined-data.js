const fs = require('fs')

// Fetches data from google analytics
const fetchGoogleAnalyticsData = require('./fetch-google-analytics-data')

// Scrapes data from the foundry to map URLS to people (Post title, author, etc)
const scrapeFoundryPageForData = require('./scrape-foundry-page-for-data.js')

// Scrapes the team page for a list of team members
const scrapeDataFromTeamPage = require('./scrape-data-from-team-page.js')

const { fetchRows } = require('./google-sheets')

const SPREADSHEET_ID = '112E7gwDa-LK2MLQI3I1TpojmLXhtWnB9AXMkGWuiBms'
const baseUrl = "https://seesparkbox.com/foundry"

const env = process.env.NODE_ENV
const disableCache = process.env.DISABLE_CACHE

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

const reformatGoogleSheetsData = (googleSheetsData) => {
  googleSheetsData = googleSheetsData || []

  return googleSheetsData.map(row => {
    const [
      message,
      awesomePerson,
      author,
      approver,
      timestamp,
    ] = row

    return {
      message,
      awesomePerson,
      author,
      approver,
      timestamp,
    }
  })
}

const cleanReformattedGoogleAnalyticsData = (data) => {
  const cleanData = data.filter(i => i.author !== 'Sparkbox')
  return cleanData
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
  const googleAnalyticsDataPromise = fetchGoogleAnalyticsData()
        .then(reformatGoogleAnalyticsData)
        .then(cleanReformattedGoogleAnalyticsData)
  const googleSheetsDataPromise = fetchRows(SPREADSHEET_ID)
        .then(reformatGoogleSheetsData)

  return Promise.all([
    teamDataPromise,
    googleAnalyticsDataPromise,
    googleSheetsDataPromise,
  ]).then(values => {
    const [ teamData, googleAnalyticsData, googleSheetsData ] = values
    const postAnalyticsData = googleAnalyticsData.map(item => {
      return {
        ...item,
        featurePerson: teamData.find(member => member.fullName === item.author)
      }
    })

    const messageData = googleSheetsData.map(row => {
      return {
        ...row,
        featurePerson: teamData.find(member => member.fullName === row.awesomePerson)
      }
    })


    return {
      postAnalyticsData,
      messageData,
    }
  })
}

module.exports = fetchCombinedData
