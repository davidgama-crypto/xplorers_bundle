const GameRoom = require('../models/GameRoom');
const Player = require('../models/Player');

class RoomsController {
  static async generateRoom() {
    const room = await new GameRoom().save();
    return room;
  }

  static async generateRoomUrl(serverUrl) {
    const room = await RoomsController.generateRoom();
    const url = `${serverUrl}/api/rooms/${room.id}`;
    return url;
  }

  static async getRoomById(roomId) {
    console.log(`getting key ${roomId}`);
    // https://www.npmjs.com/package/redis-json
    return GameRoom.findById(roomId);
  }

  static async createNewPlayerForRoom(room, displayName, avatar) {
    const newPlayer = new Player(displayName, avatar);
    room.addPlayer(newPlayer);
    await room.save();
    return newPlayer;
  }
}

module.exports = RoomsController;
