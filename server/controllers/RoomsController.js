const GameRoom = require('../models/GameRoom');

class RoomsController {
  static async generateRoom() {
    const room = await new GameRoom().save();
    return room;
  }

  static async generateRoomUrl(serverUrl) {
    const room = await RoomsController.generateRoom();
    const url = `${serverUrl}/${room.id}`;
    return url;
  }

  static async getRoom(roomId) {
    console.log(`getting key ${roomId}`);
    // https://www.npmjs.com/package/redis-json
    return GameRoom.findById(roomId);
  }
}

module.exports = RoomsController;
