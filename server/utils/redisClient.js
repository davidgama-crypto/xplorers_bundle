const Redis = require('ioredis');
const JSONCache = require('redis-json');
const redisConfig = require('./redisConfig');

const singletonClient = new JSONCache(new Redis(redisConfig.REDIS_CONF));

module.exports = singletonClient;
