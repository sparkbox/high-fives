const { fetchRows } = require('./lib/google-sheets')

const SPREADSHEET_ID = '112E7gwDa-LK2MLQI3I1TpojmLXhtWnB9AXMkGWuiBms'

const main = async () => {
  console.log(await fetchRows(SPREADSHEET_ID))
}

main()
