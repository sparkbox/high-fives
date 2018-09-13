// followed this quickstart guide: https://developers.google.com/sheets/api/quickstart/nodejs
// that's why some of this code looks different

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const TOKEN_PATH = '../token.json';
const CREDENTIALS_FILE = 'credentials.json'


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '112E7gwDa-LK2MLQI3I1TpojmLXhtWnB9AXMkGWuiBms',
    range: 'Class Data!A2:E4',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}

const getCredentials = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(CREDENTIALS_FILE, (err, content) => {
      if (err) return reject(err)
      const credentials = JSON.parse(content)
      resolve(credentials)
    })
  })
}

const getAuth = (credentials) => {
  return new Promise((resolve, reject) => {
    authorize(credentials, resolve)
  })
}

const fetchRows = async (spreadsheetId) => {
  const credentials = await getCredentials()
  const auth = await getAuth(credentials)
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
  const credentials = await getCredentials()
  const auth = await getAuth(credentials)

  const sheets = google.sheets({version: 'v4', auth})
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

// const appendRow = async (row, spreadsheetId, range) => {
//   console.log('row appended! (jk)')
// }

module.exports = {
  appendRow,
  fetchRows,
}
