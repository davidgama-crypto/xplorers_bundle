import request from './request';

class APIRequestHandler {
  async createNewRoom() {
    const roomInformation = (await request(
      '/api/rooms',
      {
        method: 'GET',
      },
    ));
    return roomInformation;
  }

  async getRoomId() {
    const roomInformation = (await request(
      '/api/rooms',
      {
        method: 'GET',
      },
    ));
    return roomInformation;
  }

  // requires auth
  async getRoomState(roomId, token) {
    const response = await request(
      `/api/rooms/${roomId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  }

  // generates the token
  async addPlayer(roomId, playerInfo) {
    const response = await request(
      `/api/rooms/${roomId}/players`,
      {
        method: 'POST',
        body: JSON.stringify(playerInfo),
      },
    );

    return response;
  }

  // requires auth
  async addGames(roomId, games, token) {
    const { response } = (await request(
      `/api/rooms/${roomId}/games`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(games),
      },
    ));
    return response;
  }

  // requires auth
  async getPlayerInfo() {
    const roomId = JSON.parse(localStorage.getItem('roomId'));
    const playerId = JSON.parse(localStorage.getItem('playerId'));
    const { playerInformation } = (await request(
      `/api/rooms/${roomId}/players/${playerId}`,
      {
        method: 'GET',
      },
    ));
    return playerInformation;
  }

  // requires auth
  async updatePlayerInfo(roomId, playerId, playerInfo, token) {
    const { response } = await request(
      `/api/rooms/${roomId}/players/${playerId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(playerInfo),
      },

    );
    return response;
  }

  async updatePlayerState(roomId, playerId, playerState, token) {
    const requestPayload = {
      playerState: {
        [playerId]: playerState,
      },
    };

    const { response } = await request(
      `/api/rooms/${roomId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestPayload),
      },

    );
    return response;
  }
}

const singleton = new APIRequestHandler();

export default singleton;
