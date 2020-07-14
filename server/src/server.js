const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const botRouter = require('./routers/bot');
const roomsRouter = require('./routers/rooms');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

app.use('/api/bot', botRouter);
app.use('/api/rooms', roomsRouter);

// Serve static files from the React app
app.use(
  express.static(path.join(__dirname, '../', 'public'), {
    fallthrough: true,
  }),
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

const server = http.Server(app);

const io = require('./routers/socket')(server);

global.io = io;

module.exports = server;
