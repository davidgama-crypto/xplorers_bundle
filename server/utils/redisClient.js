var Redis = require("ioredis");
var JSONCache  = require('redis-json');
var redisConfig = require("../utils/redisConfig");


class RedisClient{

    constructor() {
        if (RedisClient.instance === undefined) {
            const redisClient = new Redis(redisConfig.REDIS_CONF);
            RedisClient.instance = new JSONCache(redisClient);
        }

    }

    static getInstance() {
        if (RedisClient.instance === undefined) {
             new RedisClient();
         }
        return  RedisClient.instance;
    }

}

module.exports = RedisClient;