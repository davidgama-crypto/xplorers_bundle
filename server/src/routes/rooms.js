const express = require('express');
const { verifyJwt } = require('../utils/middleware');
const RoomsController = require('../controllers/RoomsController');
const BadOperationError = require('../errors/BadOperationError');
const MissingResourceError = require('../errors/MissingResourceError');

const router = express.Router();
const serverURL = process.env.SELF_DOMAIN;

if (!serverURL) {
  console.log('SELF_DOMAIN env var not set!');
  process.exit(1);
}

// Create a new room
router.get('/', async (req, res, next) => {
  try {
    const roomInfo = await RoomsController.generateRoom(serverURL);
    res.send(roomInfo);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Get the a specific room's state
router.get('/:id', verifyJwt, async (req, res, next) => {
  try {
    const { id } = req.token;
    const room = await RoomsController.getRoomById(req.params.id);
    if (!room.playerInRoom(id)) {
      res.status(403).send({
        error: `playerId=${id} not in roomId=${room.id}`,
      });
      return;
    }
    res.send(room.state);
  } catch (err) {
    console.log(err);
    if (err instanceof MissingResourceError) {
      res.status(404).send({
        error: err.message,
      });
      return;
    }
    next(err);
  }
});

// Update a player's game state in the room
router.put('/:roomId', verifyJwt, async (req, res, next) => {
  try {
    const playerId = req.token.id;
    const { roomId } = req.params;
    const playerState = req.body;

    const room = await RoomsController.updatePlayerStateInRoom(roomId, playerId, playerState);
    res.send(room.state);
  } catch (err) {
    console.log(err);
    if (err instanceof BadOperationError) {
      res.status(400).send({
        error: err.message,
      });
      return;
    }
    next(err);
  }
});

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
    console.log(err);
    if (err instanceof MissingResourceError) {
      res.status(400).send({
        error: err.message,
      });
      return;
    }
    next(err);
  }
});

// Get info about player in a room
router.get('/:roomId/players/:playerId', async (req, res, next) => {
  try {
    const { roomId, playerId } = req.params;

    const playerInfo = await RoomsController.getPlayerInRoom(roomId, playerId);
    delete playerInfo.token;
    res.send(playerInfo);
  } catch (err) {
    console.log(err);

    if (err instanceof MissingResourceError) {
      res.status(404).send({
        error: err.message,
      });
    }

    next(err);
  }
});

// Player changes their ready state, display name, or avatar
router.put('/:roomId/players/:playerId', verifyJwt, async (req, res, next) => {
  try {
    const { roomId, playerId } = req.params;
    const room = await RoomsController.getRoomById(roomId);
    const newState = RoomsController.updatePlayerInfoInRoom(room, playerId, req.body);
    res.send(newState);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Player leaves the room
// : should be handled by socket

module.exports = router;
