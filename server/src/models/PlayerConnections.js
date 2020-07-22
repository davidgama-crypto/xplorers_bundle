class PlayerConnections {
  constructor() {
    this.playerConnections = {};
  }

  addPlayerConnection(playerId, roomId, socket) {
    this.removePlayerConnection(socket);

    this.playerConnections[playerId] = {
      socket,
      roomId,
    };
    socket.join(roomId);
  }

  getInfoForConnection(socket) {
    const entries = Object.entries(this.playerConnections);
    const found = entries.find((e) => e[1].socket === socket);

    if (!found) return null;
    return {
      playerId: found[0],
      info: found[1],
    };
  }

  removePlayerConnection(socket) {
    const connectionInfo = this.getInfoForConnection(socket);
    if (connectionInfo && connectionInfo.playerId) {
      const { roomId, playerId } = connectionInfo;
      socket.leave(roomId);
      delete this.playerConnections[playerId];
    }
  }
}

const singleton = new PlayerConnections();
module.exports = singleton;
