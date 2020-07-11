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
  const roomInfo = await RoomsController.generateRoom(serverURL);
  res.send(roomInfo);
});

// Get the a specific room's state
router.get('/:id', async (req, res) => {
  const room = await RoomsController.getRoomById(req.params.id);
  res.send(room);
});

// Update a specific room's state

// Player joins/rejoins the room
router.post('/:id/players', async (req, res, next) => {
  try {
    const { displayName, avatar } = req.body;
    const { id } = req.params;
    if (!displayName || !avatar) {
      res.status(400).send({
        error: 'Missing displayName or avatar',
      });
      return;
    }
    const room = await RoomsController.getRoomById(id);
    const player = await RoomsController.createNewPlayerForRoom(room, displayName, avatar);
    res.send(player);
  } catch (err) {
    next(err);
  }
});

router.get('/:roomId/players/:playerId', async (req, res, next) => {
  try {
    const { roomId, playerId } = req.params;

    const playerInfo = await RoomsController.getPlayerInRoom(roomId, playerId);
    delete playerInfo.token;
    res.send(playerInfo);
  } catch (e) {
    next(e);
  }
});

router.put('/:roomId/players/:playerId', async (req, res, next) => {
  try {
    const { roomId, playerId } = req.params;
    const room = await RoomsController.getRoomById(roomId);
    const newState = RoomsController.updatePlayerInRoom(room, playerId, req.body);
    res.send(newState);
  } catch (err) {
    next(err);
  }
});

// Player changes their ready state, display name, or avatar

// Player leaves the room

module.exports = router;
