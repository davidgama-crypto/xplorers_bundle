/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');

// supertestInit() takes in an express app and returns request client, server object
function init(server) {
  return new Promise((resolve) => {
    server.listen(0, () => {
      const request = supertest(server);
      request.server = server;
      request.serverAddress = `http://localhost:${server.address().port}`;
      resolve(request);
    });
  });
}

module.exports = init;
