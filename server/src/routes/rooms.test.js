const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const app = require('../app');

const request = supertest(app);
let createdRoomId;
let createdPlayerId1;
let createdPlayer1Token;
const validNonPlayerToken = jwt.sign({ id: 'nonexistant' }, JWT_SECRET);

describe('rooms API', () => {
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
        expect(connected).toBe(true);
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
        ready: true,
        done: true,
      })
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .expect(200)
      .expect((res) => {
        const { id, ready, done } = res.body;
        expect(id).toBe(createdPlayerId1);
        expect(ready).toBe(true);
        expect(done).toBe(true);
      })
      .end(doneCb);
  });

  it('updating player info without token fails with 403 Forbidden', (doneCb) => {
    request
      .put(`/api/rooms/${createdRoomId}/players/${createdPlayerId1}`)
      .send({
        ready: true,
        done: true,
      })
      .expect(401)
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
    request
      .put(`/api/rooms/${createdRoomId}`)
      .set('Authorization', `Bearer ${createdPlayer1Token}`)
      .expect(400)
      .end(doneCb);
  });

  // can update a player's state in a game room

  // can add a game to an existing room if host

  // trying to start a game room with only 1 player results in 400

  // a game room with 2 players all ready=true starts automatically
});
