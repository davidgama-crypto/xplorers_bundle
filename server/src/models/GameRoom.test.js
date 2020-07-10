const GameRoom = require('./GameRoom');
const MockCache = require('../utils/MockCache');
const Player = require('./Player');

const cache = new MockCache();
GameRoom.DataStore = cache;

describe('GameRoom', () => {
  let room;
  let p1;
  let p2;

  it('can be created, saved, and found', async () => {
    room = await new GameRoom().save();
    expect(room.id).toBeDefined();
    expect(room.state.id).toBeDefined();

    const found = await GameRoom.findByRoomId(room.id);
    expect(found.id).toBe(room.id);
    expect(found.state).toBe(room.state);
  });

  it('throws error when looking for non-existant roomId', async () => {
    const nonExistantId = 'noexists';

    async function shouldThrow() {
      return GameRoom.findByRoomId(nonExistantId);
    }

    await expect(shouldThrow()).rejects.toThrow(Error);
  });

  it('can add / remove players', async () => {
    const player = new Player('test1', 'pig');

    expect(room.playerInRoom(player)).toBe(false);

    room.addPlayerToRoom(player);

    const expected = {};
    expected[player.id] = player;

    expect(room.state.current.players).toStrictEqual(expected);
    expect(room.playerInRoom(player)).toBe(true);
    expect(room.getTotalNumberOfPlayers()).toBe(1);

    room.removePlayerFromRoom(player);
    expect(room.state.current.players).toStrictEqual({});
    expect(room.getTotalNumberOfPlayers()).toBe(0);
    expect(room.playerInRoom(player)).toBe(false);
  });

  it('can add a game of type test', async () => {
    expect(room.gameExists('test')).toBe(false);

    room.addGame('test', 1);
    expect(room.state.totalGames).toBe(1);
    expect(room.state.gameData[0].type).toBe('test');
    expect(room.state.gameData[0].totalRounds).toBe(1);

    expect(room.getGameIndex('test')).toBe(0);
    expect(room.gameExists('test')).toBe(true);
  });

  it('can adjust rounds for an already added game', () => {
    const game = room.getGameDataForType('test');
    expect(game.totalRounds).toBe(1);
    room.setRoundsForGame('test', 2);
    expect(game.totalRounds).toBe(2);
  });

  it('throws when trying to add a game that was already added', () => {
    expect(() => room.addGame('test', 1)).toThrow();
  });

  it('can remove an existing game', () => {
    expect(room.state.totalGames).toBe(1);
    room.removeGame('test');
    expect(room.state.totalGames).toBe(0);
    expect(room.gameExists('test')).toBe(false);
  });

  it('throws when trying to getGameDataForType for nonexistant game', () => {
    expect(() => room.getGameDataForType('noexist')).toThrow();
  });

  it('throws when invoking next without adding 2 players', () => {
    expect(() => room.next()).toThrow('Need at least 2 players in room, cannot call next()');

    p1 = new Player('test1', 'pig');
    room.addPlayerToRoom(p1);

    expect(() => room.next()).toThrow('Need at least 2 players in room, cannot call next()');

    p2 = new Player('test2', 'pig');
    room.addPlayerToRoom(p2);
  });

  it('throws when invoking next without adding a game', () => {
    expect(() => room.next()).toThrow('No games added to room, cannot call next()');
  });

  it('can progressively call next to finish the game', () => {
    room.addGame('test', 2);

    expect(room.state.current.game).toBe(0);
    expect(room.state.current.round).toBe(0);
    expect(room.state.current.phase).toBe(0);
    expect(room.gameRoomIsFinished()).toBe(false);

    room.next();
    expect(room.state.current.phase).toBe(1);
    room.next();
    expect(room.state.current.phase).toBe(2);
    room.next();

    expect(room.state.current.game).toBe(0);
    expect(room.state.current.round).toBe(1);
    expect(room.state.current.phase).toBe(0);
    expect(room.gameRoomIsFinished()).toBe(false);

    room.next();
    expect(room.state.current.phase).toBe(1);
    room.next();
    expect(room.state.current.phase).toBe(2);
    room.next();

    expect(room.state.current.game).toBe(0);
    expect(room.state.current.round).toBe(0);
    expect(room.state.current.phase).toBe(0);
    expect(room.gameRoomIsFinished()).toBe(true);
  });
});
