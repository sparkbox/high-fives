const { google } = require('googleapis')

const scrapeDataFromURL = require('./lib/scrape-data-from-url')
const getTeamData = require('./lib/get-team-data')

const key = require('./client_secret.json')
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)
const view_id = '41465154'

const baseUrl = "https://seesparkbox.com/foundry"

const pathsToFilter = [
  '/', // We don't want to include the listing page
  '/semantic_commit_messages', // written by Jeremy, who's no longer at Sparkbox
]

let filterString = `ga:pagePathLevel1==/foundry/`
filterString += pathsToFilter.map((p) => `;ga:pagePathLevel2!=${p}`).join('');

const GARequestOptions = {
  auth: jwt,
  ids: 'ga:' + view_id,
  'start-date': '7daysAgo',
  'end-date': 'today',
  metrics: 'ga:pageviews',
  dimensions: 'ga:pagePathLevel2',
  filters: filterString,
  'max-results': 10,
  sort: '-ga:pageviews',
}

const arrayFromGAToPrettyObject = (dataArray) => {
  const [relativeUrl, views] = dataArray
  return {
    url: `${baseUrl}${relativeUrl}`,
    views,
  }
}

const hydrateGAObjectWithScrapedData = async (obj) => {
  try {
    const { author } = await scrapeDataFromURL(obj.url)
    const hydratedObj = {...obj, author}
    return hydratedObj
  } catch (error) {
    console.log(`${error}: ${obj.url}`)
    return obj
  }
}

const formatAndHydrateGAResults = (result) => {
  const analyticsData = result.data.rows.map(arrayFromGAToPrettyObject)
  return Promise.all(analyticsData.map(hydrateGAObjectWithScrapedData))
}

jwt.authorize(async (err, response) => {
  const analyticsPromise = google.analytics('v3').data.ga.get(GARequestOptions)
        .then(formatAndHydrateGAResults)
  const teamPromise = getTeamData()

  Promise.all([analyticsPromise, teamPromise]).then(values => {
    const [ analyticsResults, teamResults ] = values
    
    const hydratedResults = analyticsResults.map(result => {
      return { ...result, author: teamResults.find(m => m.fullName === result.author) }
    })

    console.log(hydratedResults)
  })

})
