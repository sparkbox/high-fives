// followed this quickstart guide: https://developers.google.com/sheets/api/quickstart/nodejs
// that's why some of this code looks different

const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const getAuth = require('./get-google-auth')

const fetchRows = async (spreadsheetId) => {
  const auth = getAuth()
  const sheets = google.sheets({version: 'v4', auth})

  return sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: 'A2:E',
  })
    .then(res => {
      return res.data.values
    })
    .catch(console.log)

}

const appendRow = async (row, spreadsheetId) => {
  const auth = getAuth()
  const sheets = google.sheets({version: 'v4', auth: jwt})

  sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [ row ]
    },
  }, (err, res) => {
    if (err) return console.error('Error while trying append to spreadsheet', err);
    console.log(`Successfully added to spreadsheet: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
  })
}

module.exports = {
  appendRow,
  fetchRows,
}
