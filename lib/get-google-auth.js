const { google } = require('googleapis')

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/analytics.readonly'
]

const CREDENTIALS_FILE = 'client_secret.json'

const getCredentials = () => {
  const credentials = {}
  credentials.client_email = process.env.CLIENT_EMAIL
  credentials.private_key = process.env.PRIVATE_KEY

  return credentials
}

const getAuth = async () => {
  const credentials = getCredentials()
  return new google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES)
}

module.exports = getAuth
