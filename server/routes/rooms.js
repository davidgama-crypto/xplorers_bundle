let RoomsController = require("../controllers/RoomsController");
const express = require('express');
const router = express.Router();

const roomsController = new RoomsController();

/* GET users listing. */
router.get('/', async (req, res) =>{
    const roomId = await roomsController.generateRoom(res.redisClient);
    const url = req.protocol + '://' + req.get('host') + req.originalUrl +'/' + roomId;
    res.send(url);
});

router.get('/:id', async (req, res) =>{
    const roomId = await roomsController.getRoom(res.redisClient, req.params.id);
    res.json(roomId);
});


module.exports = router;
