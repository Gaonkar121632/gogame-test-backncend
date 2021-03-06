var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./models/connection');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game');
const cors = require('cors');


var app = express();
var http = require('http').Server(app);
app.use(cors())

app.use(bodyParser.json({
  limit: "10mb"
}));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb"
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-access-token,Content-Type");
  res.header("Access-Control-Expose-Headers", "x-access-token,Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Content-Type", 'application/json');
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', gameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set('port', 3000);
http.listen(app.get('port'))
console.log('Server Running on port no: ' + app.get('port'))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
