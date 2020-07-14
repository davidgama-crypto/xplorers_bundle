const socketIOClient = require('socket.io-client');
const server = require('../server');
const init = require('../testUtils/init');

let request;
let ioClient;
let ioClient2;
let roomId;
let player1;
let player2;
let connected = false;

async function addPlayer() {
  const res = await request
    .post(`/api/rooms/${roomId}/players`)
    .send({
      displayName: 'test',
      avatar: 'test',
    });
  expect(res.status).toBe(200);
  return res.body;
}

async function updatePlayerInfo(playerId, playerToken, changes) {
  const res = await request
    .put(`/api/rooms/${roomId}/players/${playerId}`)
    .set('Authorization', `Bearer ${playerToken}`)
    .send(changes);
  expect(res.status).toBe(200);
  return res.body;
}

async function getRoom(id, token) {
  const res = await request
    .get(`/api/rooms/${id}`)
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);
  return res.body;
}

describe('socket events', () => {
  beforeAll(async () => {
    request = await init(server);

    // setup game room for testing
    const res = await request.get('/api/rooms');
    roomId = res.body.roomId;
  });

  it('can connect successfully and successfully authenticate for 1 player', async (done) => {
    ioClient = socketIOClient(`${request.serverAddress}/`);

    ioClient.once('connect', () => {
      connected = true;
      expect(connected).toBe(true);
    });

    // add player1 to the room
    player1 = await addPlayer();

    ioClient.emit('authenticate', {
      playerId: player1.id,
      token: player1.token,
      roomId,
    }, async () => {
      const room = await getRoom(roomId, player1.token);

      const { players } = room.current;
      expect(room.id).toBe(roomId);
      expect(players).toBeDefined();
      expect(players[player1.id].connected).toBe(true);

      done();
    });
  });

  // trying to authenticate with wrong player 2 token results in failure to connect
  it('closes socket when there is wrong token sent during authentication', async (done) => {
    ioClient2 = socketIOClient(`${request.serverAddress}/`);

    player2 = await addPlayer();

    ioClient2.emit('authenticate', {
      playerId: player2.id,
      token: 'random',
      roomId,
    });

    ioClient2.once('disconnect', () => {
      ioClient2.close();
      done();
    });
  });

  // when player2 connects, player1 gets an update event
  it('when player2 connects, player1 gets an update event', (done) => {
    ioClient2.connect();
    ioClient2.emit('authenticate', {
      playerId: player2.id,
      token: player2.token,
      roomId,
    });

    ioClient.once('updated', (message) => {
      expect(message.current.players[player2.id].connected).toBe(true);
      expect(message.current.players[player1.id].connected).toBe(true);
      done();
    });
  });

  // when 2 players are connected, playerInfo changes from 1 player triggers update event
  it('when player 2 updates their ready state, player 1 receives updated event', async (done) => {
    ioClient.once('updated', (message) => {
      expect(message.current.players[player2.id].ready).toBe(true);
      expect(message.current.players[player1.id].ready).toBe(false);
      expect(message.current.status).toBe('waiting');
      done();
    });

    await updatePlayerInfo(player2.id, player2.token, {
      ready: true,
    });
  });

  // when all players are ready, game room status updates to playing
  it('when all players are ready, game room status updates to playing', async (done) => {
    ioClient.once('updated', (message) => {
      console.log(message.current.players);

      expect(message.current.players[player2.id].ready).toBe(true);
      expect(message.current.players[player1.id].ready).toBe(true);
      expect(message.current.status).toBe('playing');
      done();
    });

    await updatePlayerInfo(player1.id, player1.token, {
      ready: true,
    });
  });

  // when all players are done for the current phase, room state is updated for all clients
  it('when all players are ready, game room status updates to playing', async (done) => {
    const res = await request
      .put(`/api/rooms/${roomId}/games`)
      .set('Authorization', `Bearer ${player1.token}`)
      .send({
        games: [
          {
            type: 'test',
            rounds: 1,
          },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.totalGames).toBe(1);
    console.log(res.body.current.players);

    const room = await getRoom(roomId, player1.token);

    expect(room.current.game).toBe(0);
    expect(room.current.round).toBe(0);
    expect(room.current.phase).toBe(0);
    expect(room.current.players[player1.id].ready).toBe(true);
    expect(room.current.players[player2.id].ready).toBe(true);
    expect(room.current.players[player1.id].done).toBe(false);
    expect(room.current.players[player2.id].done).toBe(false);

    // this will trigger for player1
    ioClient.once('updated', (message) => {
      expect(message.current.game).toBe(0);
      expect(message.current.round).toBe(0);
      expect(message.current.phase).toBe(0);
      expect(message.current.players[player1.id].ready).toBe(true);
      expect(message.current.players[player2.id].ready).toBe(true);

      expect(message.current.players[player1.id].done).toBe(true);
      expect(message.current.players[player2.id].done).toBe(false);
      done();
    });

    await updatePlayerInfo(player1.id, player1.token, {
      done: true,
    });

    // then this will trigger for player2's update
    ioClient.once('updated', (message) => {
      expect(message.current.game).toBe(0);
      expect(message.current.round).toBe(0);
      expect(message.current.phase).toBe(1);
      expect(message.current.players[player1.id].ready).toBe(true);
      expect(message.current.players[player2.id].ready).toBe(true);

      expect(message.current.players[player1.id].done).toBe(false);
      expect(message.current.players[player2.id].done).toBe(false);
      done();
    });

    await updatePlayerInfo(player2.id, player2.token, {
      done: true,
    });
  });

  // when phase duration is met, room state is updated for all clients

  afterAll(async (done) => {
    // disconnect manually
    ioClient.close();
    ioClient2.close();

    request.server.close(() => {
      done();
    });
  });
});
