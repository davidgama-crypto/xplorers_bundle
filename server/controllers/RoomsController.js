const { nanoid } = require("nanoid")
const RedisClient = require("../utils/redisClient")

class RoomsController {
  static async generateRoom() {
    const roomId = nanoid()
    const roomJson = {
      roomId: roomId,
    }

    //https://www.npmjs.com/package/redis-json
    const redisClient = await RedisClient.getInstance()
    await redisClient.set(roomId, roomJson)
    return roomId
  }

  static async getRoom(roomId) {
    console.log("getting key " + roomId)
    //https://www.npmjs.com/package/redis-json
    return await RedisClient.getInstance().get(roomId)
  }
}

module.exports = RoomsController
