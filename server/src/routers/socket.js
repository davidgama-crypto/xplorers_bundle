const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const RoomController = require('../controllers/RoomsController');
const { JWT_SECRET } = require('../utils/constants');

function init(server) {
  const io = socketIO(server);

  io.on('connect', (socket) => {
    console.log('Incoming connection');

    socket.on('disconnecting', async () => {
      console.log('socket disconnecting....');
      await RoomController.removePlayerConnection(socket);
    });

    socket.on('disconnect', async (reason) => {
      console.log(`socket disconnected for reason=${reason}`);
    });

    socket.on('authenticate', async (message, ack) => {
      try {
        const { playerId, roomId, token } = message;
        console.log(`authenticate request received playerId=${playerId}, roomId=${roomId}`);

        jwt.verify(token, JWT_SECRET);
        const newState = await RoomController.playerConnectedToRoom(roomId, playerId, socket);
        console.log('successfully authenticated');
        console.log(newState);
        if (ack !== undefined) {
          console.log('ack() defined in authenticate request, sending ack(success)');
          ack('success');
        }
      } catch (err) {
        console.log('error during socket authentication');
        console.log(err);
        if (ack !== undefined) {
          console.log('ack() defined in authenticate request, sending ack(forbidden)');
          ack('forbidden');
        }
      }
    });
  });

  return io;
}

module.exports = init;
