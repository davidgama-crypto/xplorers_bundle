const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const server = require('../server');
const init = require('../testUtils/init');

let request;
let createdRoomId;
let createdPlayerId1;
let createdPlayer1Token;
let createdPlayerId2;
let createdPlayer2Token;
const validNonPlayerToken = jwt.sign({ id: 'nonexistant' }, JWT_SECRET);

// Utility function to simulate game phase
async function finishOneGamePhase() {
  let res = await request
    .put(`/api/rooms/${createdRoomId}/players/${createdPlayerId1}`)
    .set('Authorization', `Bearer ${createdPlayer1Token}`)
    .send({
      done: true,
    });
  expect(res.status).toBe(200);

  res = await request
    .put(`/api/rooms/${createdRoomId}/players/${createdPlayerId2}`)
    .set('Authorization', `Bearer ${createdPlayer2Token}`)
    .send({
      done: true,
    });
  expect(res.status).toBe(200);
}

describe('rooms API', () => {
  beforeAll(async () => {
    request = await init(server);
  });

  it('can create a room which returns a roomId and url', (done) => {
    request
      .get('/api/rooms')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.roomId).toBeDefined();
        expect(res.body.url).toBeDefined();

        createdRoomId = res.body.roomId;
        return done();
      });
  });
  it('can add a player to an existing room', (doneCb) => {
    request
      .post(`/api/rooms/${createdRoomId}/players`)
      .send({
        displayName: 'test',
        avatar: 'test',
      })
      .expect(200)
      .expect((res) => {
        const {
          id,
          token,
          displayName,
          avatar,
          connected,
          done,
          ready,
        } = res.body;
        expect(id).toBeDefined();
        expect(token).toBeDefined();
        expect(displayName).toBe('test');
        expect(avatar).toBe('test');
        expect(connected).toBe(false);
        expect(done).toBe(false);
        expect(ready).toBe(false);

        createdPlayerId1 = id;
        createdPlayer1Token = token;
      })
      .end(doneCb);
  });

  it('trying to add a player to non existant room fails with 400', (doneCb) => {
    request
      .post('/api/rooms/nonexistant/players')
      .send({
        displayName: 'test',
        avatar: 'test',
      })
      .expect(400)
      .end(doneCb);
  });

  it('can get the previously created player info', (done) => {
    request
      .get(`/api/rooms/${createdRoomId}/players/${createdPlayerId1}`)
      .expect(200)
      .expect((res) => {
        const {
          displayName, avatar, id, token,
        } = res.body;
        expect(id).toBe(createdPlayerId1);
        expect(displayName).toBe('test');
        expect(avatar).toBe('test');
        expect(token).toBe(undefined);
      })
      .end(done);
  });

  it('getting non-existant player info returns 404', (done) => {
    request
      .get(`/api/rooms/${createdRoomId}/players/nonexistant`)
      .expect(404)
      .expect((res) => {
        expect(res.body).toStrictEqual({
          error: `playerId=nonexistant not in roomId=${createdRoomId}`,
        });
      })
      .end(done);
  });

  it('can update the previously created player info', (doneCb) => {
    request
      .put(`/api/rooms/${createdRoomId}/players/${createdPlayerId1}`)
      .send({
        displayName: 'test2',
      })
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .expect(200)
      .expect((res) => {
        const { id, ready, done } = res.body;
        expect(id).toBe(createdPlayerId1);
        expect(ready).toBe(false);
        expect(done).toBe(false);
      })
      .end(doneCb);
  });

  it('updating player info without token fails with 403 Forbidden', (doneCb) => {
    request
      .put(`/api/rooms/${createdRoomId}/players/${createdPlayerId1}`)
      .send({
        displayName: 'test2',
      })
      .expect(401)
      .end(doneCb);
  });

  it('updating player status to ready when only 1 player is in the room results in 400', (doneCb) => {
    request
      .put(`/api/rooms/${createdRoomId}/players/${createdPlayerId1}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .send({
        ready: true,
      })
      .expect(400)
      .end(doneCb);
  });

  it('can get the room info as a player using token also first player is host', (doneCb) => {
    request
      .get(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .expect(200)
      .expect((res) => {
        const { id, current, gameData } = res.body;
        expect(id).toBe(createdRoomId);
        expect(current).toBeDefined();
        expect(current.game).toBe(0);
        expect(current.round).toBe(0);
        expect(current.phase).toBe(0);
        expect(current.host).toBe(createdPlayerId1);
        expect(gameData).toBeDefined();
        expect(gameData.length).toBe(0);
      })
      .end(doneCb);
  });

  it('trying to get non existant room returns 404', (doneCb) => {
    request
      .get('/api/rooms/nonexistantroom')
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .expect(404)
      .end(doneCb);
  });

  it('trying to get room info with player not in room returns 403', (doneCb) => {
    request
      .get(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${validNonPlayerToken}`)
      .expect(403)
      .end(doneCb);
  });

  it('trying to update player state on room with no token results in 401', (doneCb) => {
    request
      .put(`/api/rooms/${createdRoomId}`)
      .expect(401)
      .end(doneCb);
  });

  it('trying to update player state on room with no games setup results in 400', (doneCb) => {
    const payload = {};
    payload[createdPlayerId1] = {};
    request
      .put(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .send({
        playerState: payload,
      })
      .expect(400)
      .expect((res) => {
        expect(res.body).toStrictEqual({
          error: `playerId=${createdPlayerId1} tried to update playerState with no games setup`,
        });
      })
      .end(doneCb);
  });

  // can add a game to an existing room if host
  it('can add a game to an existing room if host', (doneCb) => {
    request
      .put(`/api/rooms/${createdRoomId}/games`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .send({
        games: [
          {
            type: 'test',
            rounds: 1,
          },
        ],
      })
      .expect(200)
      .expect((res) => {
        const { id, totalGames, gameData } = res.body;
        expect(id).toBe(createdRoomId);
        expect(totalGames).toBe(1);
        expect(gameData).toBeDefined();
        expect(gameData.length).toBe(1);
        expect(gameData[0].type).toBe('test');
        expect(gameData[0].totalRounds).toBe(1);
      })
      .end(doneCb);
  });

  // can update a player's state in a game room
  it('can update a player state in a game room with at least 1 game', (doneCb) => {
    const expected = {
      playerState: {},
    };
    expected.playerState[createdPlayerId1] = 5;

    request
      .put(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .send(expected)
      .expect(200)
      .expect((res) => {
        const { id, gameData } = res.body;
        expect(id).toBe(createdRoomId);
        expect(gameData).toBeDefined();
        expect(gameData.length).toBe(1);
        expect(gameData[0].rounds).toBeDefined();
        expect(gameData[0].rounds.length).toBe(1);
        expect(gameData[0].rounds[0].playerState).toBeDefined();
        expect(gameData[0].rounds[0].playerState[createdPlayerId1]).toBe(5);
      })
      .end(doneCb);
  });

  // a game room with 2 players all ready=true sets status=playing automatically
  it('can add a player to an existing room', async () => {
    // add a new player
    let res = await request
      .post(`/api/rooms/${createdRoomId}/players`)
      .send({
        displayName: 'test2',
        avatar: 'test2',
      });

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.displayName).toBe('test2');
    expect(res.body.avatar).toBe('test2');
    expect(res.body.connected).toBe(false);
    expect(res.body.done).toBe(false);
    expect(res.body.ready).toBe(false);

    createdPlayerId2 = res.body.id;
    createdPlayer2Token = res.body.token;

    // Get the current room state
    res = await request
      .get(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdRoomId);
    expect(res.body.current).toBeDefined();
    expect(res.body.current.status).toBe('waiting');

    // player1 ready
    res = await request
      .put(`/api/rooms/${createdRoomId}/players/${createdPlayerId1}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .send({
        ready: true,
      });

    expect(res.status).toBe(200);

    // player2 ready
    res = await request
      .put(`/api/rooms/${createdRoomId}/players/${createdPlayerId2}`)
      .set('Authorization', `Bearer ${createdPlayer2Token}`)
      .send({
        ready: true,
      });

    expect(res.status).toBe(200);

    // room state should now be playing
    res = await request
      .get(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdRoomId);
    expect(res.body.current).toBeDefined();
    expect(res.body.current.status).toBe('playing');
  });

  // updating current players to done progresses game to next phase from 0 -> 1
  it('updating current players to done progresses game to next phase from 0 -> 1', async () => {
    await finishOneGamePhase();

    const res = await request
      .get(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdRoomId);
    expect(res.body.current.game).toBe(0);
    expect(res.body.current.round).toBe(0);
    expect(res.body.current.phase).toBe(1);
    expect(res.body.current.status).toBe('playing');
  });

  // updating current players to done until last phase (3) finishes the current round and game
  // when the round is finished, scores are calculated for the round and added to total scores
  it('updating to last phase finishes the round and finishes game with score calculation', async () => {
    const player1State = {};
    player1State[createdPlayerId1] = 5;
    const player2State = {};
    player2State[createdPlayerId2] = 3;

    let res = await request
      .put(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .send({
        playerState: player1State,
      });

    expect(res.status).toBe(200);

    res = await request
      .put(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer2Token}`)
      .send({
        playerState: player2State,
      });

    expect(res.status).toBe(200);

    await finishOneGamePhase();

    res = await request
      .get(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdRoomId);
    expect(res.body.current.game).toBe(0);
    expect(res.body.current.round).toBe(0);
    expect(res.body.current.phase).toBe(2);
    expect(res.body.current.status).toBe('playing');

    await finishOneGamePhase();

    res = await request
      .get(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`);

    const roomState = res.body;

    expect(res.status).toBe(200);
    expect(roomState.id).toBe(createdRoomId);
    expect(roomState.current.game).toBe(0);
    expect(roomState.current.round).toBe(0);
    expect(roomState.current.phase).toBe(0);
    expect(roomState.current.status).toBe('finished');
    expect(roomState.totalScores).toBeDefined();
    expect(roomState.totalScores.length).toBe(2);
    expect(roomState.totalScores[0].playerId).toBe(createdPlayerId1);
    expect(roomState.totalScores[0].score).toBe(10 * player1State[createdPlayerId1]);
    expect(roomState.totalScores[1].playerId).toBe(createdPlayerId2);
    expect(roomState.totalScores[1].score).toBe(10 * player2State[createdPlayerId2]);

    const currentRound = roomState.gameData[0].rounds[0];
    expect(currentRound.scoredPoints[createdPlayerId1]).toBe(10 * player1State[createdPlayerId1]);
    expect(currentRound.scoredPoints[createdPlayerId2]).toBe(10 * player2State[createdPlayerId2]);
  });

  afterAll((done) => {
    request.server.close(() => {
      done();
    });
  });
});
