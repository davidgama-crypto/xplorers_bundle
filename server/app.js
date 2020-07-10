const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const botRouter = require('./routes/bot');
const roomsRouter = require('./routes/rooms');

const app = express();

app.use('/api/users', usersRouter);
app.use('/api/bot', botRouter);
app.use('/api/rooms', roomsRouter);

// Serve static files from the React app
app.use(
  express.static(path.join(__dirname, '..', 'server', 'public'), {
    fallthrough: true,
  }),
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use('*', (_, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'server', 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : { error: 'Server Error' };

    // render the error page
    res.status(err.status || 500);
    res.send('Server Error');
  }
});

module.exports = app;
