var express = require('express');
var router = express.Router();
var redis = require('redis');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //OBJECT TEST FOR API REQUEST
    const users = [
        {id: 1, firstName: "David"},
        {id: 2, firstName: "John"},
        {id: 3, firstName: "Mary"}
    ];

    //Redis test
    res.redisClient.set(1, "David", redis.print);
    res.redisClient.get(1, redis.print);
    res.json(users);
});

module.exports = router;
