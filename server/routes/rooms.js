const express = require('express');
const RoomsController = require('../controllers/RoomsController');

const router = express.Router();
const serverURL = process.env.SELF_DOMAIN;

if (!serverURL) {
  console.error('SELF_DOMAIN env var not set!');
  process.exit(1);
}

// Create a new room
router.get('/', async (req, res) => {
  const url = await RoomsController.generateRoomUrl(serverURL);
  res.send({ url });
});

// Get the a specific room's state
router.get('/:id', async (req, res) => {
  const room = await RoomsController.getRoomById(req.params.id);
  res.send(room);
});

// Update a specific room's state

// Player joins/rejoins the room
router.post('/:id/players', async (req, res) => {
  const { displayName, avatar } = req.body;
  const { id } = req.params;
  if (!displayName || !avatar) {
    res.status(400).send({
      error: 'Missing displayName or avatar',
    });
  }
  const room = await RoomsController.getRoomById(id);
  const player = await RoomsController.createNewPlayerForRoom(room, displayName, avatar);
  res.send(player);
});

// Player changes their ready state, display name, or avatar

// Player leaves the room

module.exports = router;
