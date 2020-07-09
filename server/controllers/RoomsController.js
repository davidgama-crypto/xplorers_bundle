const RoomState = require('../models/RoomState');

class RoomsController {
  static async generateRoom() {
    const room = await new RoomState().save();
    return room;
  }

  static async getRoom(roomId) {
    console.log(`getting key ${roomId}`);
    // https://www.npmjs.com/package/redis-json
    return RoomState.findById(roomId);
  }
}

module.exports = RoomsController;
