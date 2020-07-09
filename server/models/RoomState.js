const { nanoid } = require('nanoid');
const RedisClient = require('../utils/redisClient');

class RoomState {
  constructor(roomId = nanoid()) {
    this.id = roomId;
    this.state = {
      id: roomId,
      current: {},
      totalScores: [],
      totalGames: 0,
      gameData: [],
    };
  }

  static async findByRoomId(roomId) {
    const storeState = await RoomState.dao.get(roomId);
    const instance = new RoomState(roomId);
    instance.state = storeState;
    return instance;
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
    await RoomState.dao.set(key, this.state);
    return this;
  }
}

RoomState.dao = RedisClient;

module.exports = RoomState;
