var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var redis = require("redis");
const redisConfig = require("./utils/redisConfig");

var app = express();

const redisClient = redis.createClient(redisConfig.REDIS_CONF);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

redisClient.on("connect", function () {
  console.log("Connected to redis");
});

// add redisClient as a middleware
app.use(function (req, res, next) {
  res.redisClient = redisClient;
  next();
});

app.use("/api/users", usersRouter);

// Serve static files from the React app
app.use(
  express.static(path.join(__dirname, "..", "server", "public"), {
    fallthrough: true,
  })
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use("*", function (_, res, next) {
  res.sendFile(path.join(__dirname, "..", "server", "public", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
