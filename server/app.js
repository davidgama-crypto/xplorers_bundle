var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var redis = require('redis');
const redisConfig = require('./utils/redisConfig');

var app = express();

const redisClient = redis.createClient(redisConfig.REDIS_CONF);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

redisClient.on('connect', function(){
  console.log("Connected to redis");
})

// add redisClient as a middleware
app.use(function(req, res, next) {
  res.redisClient = redisClient;
  next();
});



// Serve static files from the React app
app.use(
    express.static(path.join(__dirname, '..', '..', 'client', 'build'), {
      fallthrough: true,
    })
)
// Fix static file serving in FireFox.
app.use(
    '*',
    express.static(
        path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
    )
)

app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
