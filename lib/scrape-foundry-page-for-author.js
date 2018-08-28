const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getAuthorFromHTML = html => {
  const $ = cheerio.load(html)
  const author = $('.foundry-article--author-link').first().text()

  if (author === '') {
    throw new Error('Couldn\'t find an author when trying to scrape page')
  }

  return author
}

const scrapeFoundryPageForAuthor = async url => {
  const response = await fetch(url)
  const html = await response.text()
  const data = {}

  data.author = getAuthorFromHTML(html)

  return data
}

module.exports = scrapeFoundryPageForAuthor
