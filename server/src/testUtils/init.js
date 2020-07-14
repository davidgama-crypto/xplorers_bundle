/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');

// supertestInit() takes in an express app and returns request client, server object
function init(app) {
  const server = app.listen();
  const request = supertest(server);
  request.server = server;
  request.serverAddress = `http://localhost:${server.address().port}`;
  return request;
}

module.exports = init;
