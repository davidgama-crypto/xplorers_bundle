const GameRoom = require('../models/GameRoom');
const Player = require('../models/Player');
const BadOperationError = require('../errors/BadOperationError');
const MissingResourceError = require('../errors/MissingResourceError');
const Game = require('../models/Game');

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
    if (player === undefined) throw new MissingResourceError(`playerId=${playerId} not in roomId=${roomId}`);
    return player;
  }

  static updatePlayerInfoInRoom(room, playerId, playerInfo) {
    if (!room.playerInRoom(playerId)) throw new MissingResourceError(`playerId=${playerId} doesn't existing in room`);

    const oldState = room.getPlayer(playerId);
    const newState = {
      ...oldState,
      ...playerInfo,
    };
    room.addPlayerToRoom(playerId, newState);
    return newState;
  }

  static async updatePlayerStateInRoom(roomId, playerId, playerState) {
    const room = await GameRoom.findByRoomId(roomId);
    room.setPlayerStateForCurrentGame(playerId, playerState);
    const updatedRoom = await room.save();
    return updatedRoom;
  }
}

module.exports = RoomsController;
