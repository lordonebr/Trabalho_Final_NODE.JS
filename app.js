var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var authConfig = require('./configs/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var characterRouter = require('./routes/character');
var favoritosRouter = require('./routes/favoritos');
var authRouter = require('./routes/auth');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();
require('./configs/facebook.strategy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set passport configs
app.use(require('express-session')({ secret: authConfig.secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/character', characterRouter);
app.use('/favoritos', favoritosRouter);
app.use('/auth', authRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

module.exports = app;
