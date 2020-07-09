/* istanbul ignore file */

const Redis = require('ioredis');
const JSONCache = require('redis-json');
const redisConfig = require('./redisConfig');

const redis = new Redis(redisConfig.REDIS_CONF);
const singletonClient = new JSONCache(redis);

module.exports = singletonClient;
