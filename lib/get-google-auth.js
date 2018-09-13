const { google } = require('googleapis')

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/analytics.readonly'
]

const CREDENTIALS_FILE = 'client_secret.json'

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

      const credentials = {}
      credentials.client_email = process.env.CLIENT_EMAIL
      credentials.private_key = process.env.PRIVATE_KEY

      return credentials
    }
  }
}

const getAuth = async () => {
  const credentials = getCredentials()
  return new google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES)
}

module.exports = getAuth
