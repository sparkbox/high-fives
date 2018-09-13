const { google } = require('googleapis')

const pathsToFilter = [
  '/', // We don't want to include the listing page
  '/semantic_commit_messages', // written by Jeremy, who's no longer at Sparkbox 🌝
]

let filterString = `ga:pagePathLevel1==/foundry/`

const addFilterPaths = (filterStr) => {
  return filterStr + pathsToFilter.map((p) => `;ga:pagePathLevel2!=${p}`).join('')
}

const getCredentials = () => {
  try {
    const key = require('../client_secret.json')
    return key
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('No ./client_secret.json file found. Looking for environment variables.')

      if (typeof process.env.CLIENT_EMAIL === 'undefined' ||
          typeof process.env.PRIVATE_KEY === 'undefined') {
        throw new Error('Credentials not found. Please add client_secret.json file (instructions in readme.md), or set CLIENT_EMAIL and PRIVATE_KEY environment variables.')
      }

      const auth = {}
      auth.client_email = process.env.CLIENT_EMAIL
      auth.private_key = process.env.PRIVATE_KEY

      return auth
    }
  }
}

const getGoogleAnalyticsData = async () => {
  const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
  const auth = getCredentials()

  const jwt = new google.auth.JWT(auth.client_email, null, auth.private_key, scopes)
  const view_id = '41465154'

  const GARequestOptions = {
    auth: jwt,
    ids: 'ga:' + view_id,
    'start-date': '30daysAgo',
    'end-date': 'today',
    metrics: 'ga:pageviews',
    dimensions: 'ga:pagePathLevel2',
    filters: addFilterPaths(filterString),
    'max-results': 10,
    sort: '-ga:pageviews',
  }

  return google.analytics('v3').data.ga.get(GARequestOptions)
}

module.exports = getGoogleAnalyticsData
