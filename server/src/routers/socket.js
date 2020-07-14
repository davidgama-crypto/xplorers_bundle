const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const RoomController = require('../controllers/RoomsController');
const { JWT_SECRET } = require('../utils/constants');

function init(server) {
  const io = socketIO(server);

  io.on('connect', (socket) => {
    console.log('Incoming connection');

    socket.on('disconnect', async (reason) => {
      console.log(`socket disconnected for reason=${reason}`);
      console.log(socket.rooms);
    });

    socket.on('authenticate', async (message, ack) => {
      try {
        const { playerId, roomId, token } = message;

        jwt.verify(token, JWT_SECRET);
        await RoomController.playerConnectedToRoom(roomId, playerId);
        socket.join(roomId);

        if (ack !== undefined) ack();
      } catch (err) {
        console.log(err);
        socket.disconnect();
      }
    });
  });

  return io;
}

module.exports = init;
