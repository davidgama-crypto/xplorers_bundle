const RoomsController = require("../controllers/RoomsController");

const express = require('express');
const router = express.Router();

const roomsController = new RoomsController();
const serverURL = process.env.SELF_DOMAIN;

if (!serverURL) {
    console.error("SLACK_SIGNING_SECRET or SLACK_TOKEN env var not set!");
    process.exit(1);
}

/* GET users listing. */
router.get('/', async (req, res) =>{
    const roomId = await roomsController.generateRoom();
    const url = serverURL +'/' + roomId;
    res.json({url:url});
});

router.get('/:id', async (req, res) =>{
    const roomId = await roomsController.getRoom(req.params.id);
    res.json(roomId);
});


module.exports = router;
