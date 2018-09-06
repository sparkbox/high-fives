// Hi! I'm the express app that acts as
// the web server.

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var helpers = require('handlebars-helpers')();
var myHelpers = require('./helpers');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.DISABLE_CACHE = process.env.DISABLE_CACHE || false

// Merges in custom helpers with helpers from handlebars-helpers repo
Object.assign(helpers, myHelpers);

var index = require('./routes/index');
var team = require('./routes/team');
var analytics = require('./routes/analytics');

var app = express();

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  helpers: helpers,
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
