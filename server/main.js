const app = require('./src/app');

const port = process.env.port || 3005;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
