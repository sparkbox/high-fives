const { google } = require('googleapis');

const key = require('./client_secret.json')
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)
const view_id = '41465154'

jwt.authorize((err, response) => {
  google.analytics('v3').data.ga.get(
    {
      auth: jwt,
      ids: 'ga:' + view_id,
      'start-date': '7daysAgo',
      'end-date': 'today',
      metrics: 'ga:pageviews',
      dimensions: 'ga:pagePathLevel2',
      filters: 'ga:pagePathLevel1==/foundry/;ga:pagePathLevel2!=/',
      'max-results': 10,
      sort: '-ga:pageviews',
    },
    (err, result) => {
      console.log(err, result.data.rows)
    }
  )
})


