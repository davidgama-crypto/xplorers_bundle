const GameRoom = require('../models/GameRoom');
const Player = require('../models/Player');
const MissingResourceError = require('../errors/MissingResourceError');
const NotPermittedError = require('../errors/NotPermittedError');

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

  static async createNewPlayerForRoom(roomId, displayName, avatar) {
    const room = await RoomsController.getRoomById(roomId);
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

  static async updatePlayerInfoInRoom(room, playerId, playerInfo) {
    if (!room.playerInRoom(playerId)) throw new MissingResourceError(`playerId=${playerId} doesn't existing in room`);

    const oldState = room.getPlayer(playerId);
    const newState = {
      ...oldState,
      ...playerInfo,
    };
    room.updatePlayerInfo(playerId, newState);
    await room.save();
    return newState;
  }

  static async updatePlayerStateInRoom(roomId, playerId, playerState) {
    const room = await GameRoom.findByRoomId(roomId);
    room.setPlayerStateForCurrentGame(playerId, playerState[playerId]);
    const updatedRoom = await room.save();
    return updatedRoom;
  }

  static async updateRoomGames(roomId, playerId, gamesToAdd) {
    const room = await GameRoom.findByRoomId(roomId);
    if (!room.playerIsHost(playerId)) throw new NotPermittedError(`playerId=${playerId} is not host of roomId=${roomId}`);
    gamesToAdd.forEach((e) => room.addGame(e.type, e.rounds));
    const updatedRoom = await room.save();
    return updatedRoom;
  }
}

module.exports = RoomsController;
