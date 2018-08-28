const fetch = require('node-fetch')
const cheerio = require('cheerio')

const baseUrl = 'https://seesparkbox.com'
const teamPageUrl = `${baseUrl}/team`

const getTeamDataFromHTML = html => {
  const $ = cheerio.load(html)
  const teamItems = $('.team__item')
  const teamData = teamItems.map((i, el) => {
    const data = {}

    data.firstName = $(el).find('.sparkboxer__first-name').text()
    data.lastName = $(el).find('.sparkboxer__last-name').text()
    data.fullName = `${data.firstName} ${data.lastName}`
    data.title = $(el).find('.sparkboxer__title').text()
    data.photo = baseUrl + $(el).find('.sparkboxer__photo').attr('src')

    return data
  }).get()

  const filteredTeamData = teamData.filter((member) => {
    return member.firstName !== 'Sparkbox'
  })

  return filteredTeamData
}

const scrapeDataFromTeamPage = async () => {
  const response = await fetch(teamPageUrl)
  const html = await response.text()

  return getTeamDataFromHTML(html)
}

module.exports = scrapeDataFromTeamPage
