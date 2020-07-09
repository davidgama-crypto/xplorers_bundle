const { nanoid } = require('nanoid');
const RedisClient = require('../utils/redisClient');

class RoomState {
  constructor() {
    this.state = {
      id: nanoid(),
      current: {},
      totalScores: [],
      totalGames: 0,
      gameData: [],
    };
  }

  static async findById(roomId) {
    try {
      const storeState = await RedisClient.get(roomId);
      const instance = new RoomState();
      instance.state = storeState;
      return instance;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // addPlayerToRoom(player) {}

  // updatePlayerInfo(player) {}

  // removePlayerFromRoom(player) {}

  // addGame(gameType) {}

  // removeGame(gameType) {}

  // setRoundsForGame(gameType) {}

  // setPlayerStateForGame(gameType, playerState) {}

  async save() {
    const key = this.state.id;
    try {
      await RedisClient.set(key, this.state);
      return this;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

module.exports = RoomState;
