const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const botRouter = require('./src/routes/bot');
const roomsRouter = require('./src/routes/rooms');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

app.use('/api/bot', botRouter);
app.use('/api/rooms', roomsRouter);

// Serve static files from the React app
app.use(
  express.static(path.join(__dirname, 'server', 'public'), {
    fallthrough: true,
  }),
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'server', 'public', 'index.html'));
});

const port = process.env.port || 3005;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
