const ignoreList = [
  ".git",
  "dist",
  "fetched-data",
  "node_modules",
]

module.exports = {
  apps : [{
    name: 'www',
    script: 'bin/www',
    watch: [
      'bin/www',
      'app.js',
      'routes',
      'lib',
    ],
  }, {
    name: 'data-fetcher',
    script: 'data-fetcher.js',
    watch: [
      'data-fetcher.js',
      'lib',
    ],
  }, {
    name: 'slackbot',
    script: 'slackbot.js',
    watch: [
      'slackbot.js',
      'lib',
    ],
  }],
}
