const GameRoom = require('../models/GameRoom');
const Player = require('../models/Player');

class RoomsController {
  static async generateRoom(serverUrl) {
    const room = await new GameRoom().save();
    const url = `${serverUrl}/api/rooms/${room.id}`;
    return {
      roomId: room.id,
      url,
    };
  }

  static async getRoomById(roomId) {
    return GameRoom.findByRoomId(roomId);
  }

  static async createNewPlayerForRoom(room, displayName, avatar) {
    const newPlayer = new Player(displayName, avatar);
    room.addPlayerToRoom(newPlayer);
    await room.save();
    return newPlayer;
  }

  static async getPlayerInRoom(roomId, playerId) {
    const room = await GameRoom.findByRoomId(roomId);
    const player = room.state.current.players[playerId];
    if (!player) throw new Error(`playerId=${playerId} not in roomId=${roomId}`);
    return player;
  }
}

module.exports = RoomsController;
