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
    room.addPlayerToRoom(newPlayer.id, newPlayer);
    await room.save();
    return newPlayer;
  }

  static async getPlayerInRoom(roomId, playerId) {
    const room = await GameRoom.findByRoomId(roomId);
    const player = room.getPlayer(playerId);
    if (player === undefined) throw new Error(`playerId=${playerId} not in roomId=${roomId}`);
    return player;
  }

  static async updatePlayerInRoom(room, playerId, playerInfo) {
    if (!room.playerInRoom(playerId)) throw new Error(`playerId=${playerId} doesn't existing in room`);

    const oldState = room.getPlayer(playerId);
    const newState = {
      ...oldState,
      ...playerInfo,
    };
    room.addPlayerToRoom(playerId, newState);
    return newState;
  }
}

module.exports = RoomsController;
