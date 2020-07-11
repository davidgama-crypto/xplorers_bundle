const { nanoid } = require('nanoid');
// problems with the redis library
// const RedisClient = require('../utils/redisClient');
const MockCache = require('../utils/MockCache');
const Game = require('./Game');
const BadOperationError = require('../errors/BadOperationError');
const MissingResourceError = require('../errors/MissingResourceError');

class GameRoom {
  constructor(roomId = nanoid()) {
    this.id = roomId;
    this.state = {
      id: roomId,
      finished: false,
      current: {
        game: 0,
        round: 0,
        phase: 0,
        players: {},
      },
      totalScores: [],
      totalGames: 0,
      gameData: [],
    };
  }

  // Get a GameRoom by RoomId
  static async findByRoomId(roomId) {
    try {
      const storeState = await GameRoom.DataStore.get(roomId);
      const instance = new GameRoom(roomId);
      instance.state = storeState;
      return instance;
    } catch (err) {
      if (err.message.includes("doesn't exist")) throw new MissingResourceError(err.message);
      throw err;
    }
  }

  addPlayerToRoom(playerId, playerInfo) {
    this.state.current.players[playerId] = playerInfo;
    if (this.getTotalNumberOfPlayers() === 1) this.state.current.host = playerId;
  }

  playerIsHost(playerId) {
    return this.current.host === playerId;
  }

  getPlayer(playerId) {
    return this.state.current.players[playerId];
  }

  removePlayerFromRoom(playerId) {
    delete this.state.current.players[playerId];
  }

  playerInRoom(playerId) {
    return this.state.current.players[playerId] !== undefined;
  }

  getGameIndex(type) {
    return this.state.gameData.findIndex((e) => e.type === type);
  }

  gameExists(type) {
    const idx = this.getGameIndex(type);
    return idx >= 0;
  }

  addGame(type, rounds) {
    if (!this.gameExists(type)) {
      const game = new Game(type, rounds);
      this.state.gameData.push(game);
      this.state.totalGames = this.state.gameData.length;
    } else {
      throw new BadOperationError(`type=${type} already added to roomId=${this.id}`);
    }
  }

  getGameDataForType(type) {
    const idx = this.getGameIndex(type);
    if (idx < 0) throw new MissingResourceError(`gameData does not exist for type=${type}`);
    return this.state.gameData[idx];
  }

  getCurrentGame() {
    if (this.state.totalGames === 0 || this.state.gameData.length === 0) {
      throw new BadOperationError(`Cannot getCurrentGame(), no games added to roomId=${this.id}`);
    }
    return this.state.gameData[this.state.current.game];
  }

  getTotalNumberOfPlayers() {
    const playerIds = this.getPlayerIds();
    return playerIds.length;
  }

  getPlayerIds() {
    return Object.keys(this.state.current.players);
  }

  removeGame(type) {
    if (this.gameExists) {
      const idx = this.getGameIndex(type);
      this.state.gameData.splice(idx, 1);
      this.state.totalGames = this.state.gameData.length;
    }
  }

  setRoundsForGame(type, rounds) {
    if (this.gameExists(type)) {
      const idx = this.getGameIndex(type);
      this.state.gameData[idx].totalRounds = rounds;
    }
  }

  // Advance the room to next game/round/phase
  next() {
    if (this.getTotalNumberOfPlayers() < 2) throw new BadOperationError('Need at least 2 players in room, cannot call next()');
    if (this.state.totalGames === 0) throw new BadOperationError('No games added to room, cannot call next()');

    // get the current game to get the totalRounds, totalPhases
    const currentGame = this.getCurrentGame();
    const { phase, round, game } = this.state.current;
    const { totalGames } = this.state;
    const { totalPhases, totalRounds } = currentGame;
    // increment the current phase and modulo with totalPhase
    const nextPhase = phase + 1;
    // if 0, then increment currentRound and modulo
    const nextRound = nextPhase === totalPhases ? round + 1 : round;
    // if 0, then increment currentGame and modulo
    const nextGame = nextRound === totalRounds ? game + 1 : game;
    // if 0, game finished
    const finished = nextGame === totalGames;

    this.state.current.game = nextGame % totalGames;
    this.state.current.round = nextRound % totalRounds;
    this.state.current.phase = nextPhase % totalPhases;
    this.state.finished = finished;
  }

  gameRoomIsFinished() {
    return this.state.finished;
  }

  // Given a playerId and state, update the current game/round's player state
  setPlayerStateForCurrentGame(playerId, playerState) {
    if (!this.playerInRoom(playerId)) throw new BadOperationError(`playerId=${playerId} not in roomId=${this.id}`);

    const currGame = this.getCurrentGame();
    const currentRound = currGame.rounds[this.state.current.round];
    currentRound.playerState[playerId] = playerState;
  }

  // Check if all current players are ready to proceed to the next game/round/phase
  allPlayersDoneWithPhase() {
    const playerEntries = Object.entries(this.state.current.players);
    const found = playerEntries.find((e) => e[1].done === false);
    return found === undefined;
  }

  // Save the room state in the DataStore
  // TODO: fix this to account for race conditions when retrieving and updating game data in redis
  async save() {
    const key = this.state.id;
    await GameRoom.DataStore.set(key, this.state);
    return this;
  }
}

// TODO: Replace with something else
GameRoom.DataStore = new MockCache();

module.exports = GameRoom;
