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
    ignore_watch: ignoreList,
  }, {
    name: 'data-fetcher',
    script: 'data-fetcher.js',
    ignore_watch: ignoreList,
  }],
}
