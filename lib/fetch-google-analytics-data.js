const { google } = require('googleapis')

const key = require('../client_secret.json')
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)
const view_id = '41465154'

const pathsToFilter = [
  '/', // We don't want to include the listing page
  '/semantic_commit_messages', // written by Jeremy, who's no longer at Sparkbox
]

let filterString = `ga:pagePathLevel1==/foundry/`

const addFilterPaths = (filterStr) => {
  return filterStr + pathsToFilter.map((p) => `;ga:pagePathLevel2!=${p}`).join('')
}

const GARequestOptions = {
  auth: jwt,
  ids: 'ga:' + view_id,
  'start-date': '7daysAgo',
  'end-date': 'today',
  metrics: 'ga:pageviews',
  dimensions: 'ga:pagePathLevel2',
  filters: addFilterPaths(filterString),
  'max-results': 10,
  sort: '-ga:pageviews',
}

const getGoogleAnalyticsData = async () => {
  return google.analytics('v3').data.ga.get(GARequestOptions)
}

module.exports = getGoogleAnalyticsData
