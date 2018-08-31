const globby = require('globby');
const path = require('path');
// const MinifyPlugin = require('babel-minify-webpack-plugin');
const jsPath = path.resolve('./src/js');

module.exports = {
  entry: './source/js/app.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.join(__dirname, './dist/js'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
  // plugins: [
  //   new MinifyPlugin()
  // ]
};
