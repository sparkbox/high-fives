const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getAuthorFromCheerioPage = $ => {
  const author = $('.foundry-article--author-link').first().text()

  if (author === '') {
    throw new Error('Couldn\'t find an author when trying to scrape page')
  }

  return author
}

const getTitleFromCheerioPage = $ => {
  const title = $('.foundry-article--title').first().text()

  if (title === '') {
    throw new Error('Couldn\'t find a title when trying to scrape page')
  }

  return title
}

const scrapeFoundryPageForData = async url => {
  const response = await fetch(url)
  const html = await response.text()
  const data = {}

  const $ = cheerio.load(html)

  data.author = getAuthorFromCheerioPage($)
  data.title = getTitleFromCheerioPage($)

  return data
}

module.exports = scrapeFoundryPageForData
