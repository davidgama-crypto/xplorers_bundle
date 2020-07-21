const { connect } = require('socket.io-client');
const GameRoom = require('../models/GameRoom');
const Player = require('../models/Player');
const MissingResourceError = require('../errors/MissingResourceError');
const NotPermittedError = require('../errors/NotPermittedError');
const PlayerConnections = require('../models/PlayerConnections');

class RoomsController {
  static async generateRoom(serverUrl) {
    const room = await new GameRoom().save();
    const url = `${serverUrl}/rooms/${room.id}`;
    return {
      roomId: room.id,
      url,
    };
  }

  static async getRoomById(roomId) {
    return GameRoom.findByRoomId(roomId);
  }

  static async createNewPlayerForRoom(roomId, playerInfo) {
    const room = await RoomsController.getRoomById(roomId);

    const newPlayer = new Player(playerInfo);
    room.addPlayerToRoom(newPlayer.id, newPlayer);
    await room.save();
    return newPlayer;
  }

  static async getPlayerInRoom(roomId, playerId) {
    const room = await RoomsController.getRoomById(roomId);
    const player = room.getPlayer(playerId);
    if (player === undefined) throw new MissingResourceError(`playerId=${playerId} not in roomId=${roomId}`);
    return player;
  }

  static async updatePlayerInfoInRoom(roomId, playerId, playerInfo) {
    const room = await RoomsController.getRoomById(roomId);
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
    const room = await RoomsController.getRoomById(roomId);
    room.setPlayerStateForCurrentGame(playerId, playerState[playerId]);
    const updatedRoom = await room.save();
    return updatedRoom;
  }

  static async updateRoomGames(roomId, playerId, gamesToAdd) {
    const room = await RoomsController.getRoomById(roomId);
    console.log('gamesToAdd:'  +gamesToAdd);
    if (!room.playerIsHost(playerId)) throw new NotPermittedError(`playerId=${playerId} is not host of roomId=${roomId}`);
    if(gamesToAdd.length === 0){
      room.removeAllGames();
    }else{
      gamesToAdd.forEach((e) => room.addGame(e.type, e.rounds));
    }
    const updatedRoom = await room.save();
    return updatedRoom;
  }

  static async playerConnectedToRoom(roomId, playerId, socket) {
    PlayerConnections.addPlayerConnection(playerId, roomId, socket);
    const newState = await RoomsController.updatePlayerInfoInRoom(roomId, playerId, {
      connected: true,
    });

    return newState;
  }

  static async removePlayerConnection(socket) {
    const connectionInfo = PlayerConnections.getInfoForConnection(socket);

    if (connectionInfo) {
      const { playerId, info } = connectionInfo;
      const { roomId } = info;

      const room = await RoomsController.getRoomById(roomId);
      if (room.gameRoomIsWaiting()) {
        room.removePlayerFromRoom(playerId);
      } else {
        room.updatePlayerInfo(playerId, {
          connected: false,
        });
      }
      PlayerConnections.removePlayerConnection(socket);
      await room.save();
    }
  }
}

module.exports = RoomsController;
