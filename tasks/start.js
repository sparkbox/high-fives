var colors = require('colors');
const shell = require("shelljs");

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = process.env.NODE_ENV

console.log(`
Starting app in ${env.bold.blue} environment
`)

if (env === 'development') {
  shell.exec("parallelshell 'pm2-runtime start ecosystem.config.js --watch' 'node tasks/watch.js' 'webpack --watch'")
} else if (env === 'production') {
  shell.exec("parallelshell 'pm2-runtime start ecosystem.config.js' 'webpack'")
}
