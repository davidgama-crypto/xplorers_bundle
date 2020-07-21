import * as SocketIO from 'socket.io-client';
import store, { roomStateUpdated } from '../store';

class Socket {
  constructor() {
    this.socket = null;
  }

  connect() {
    const url = window.location.host.startsWith('localhost')
      ? 'http://localhost:3000/'
      : '/';

    console.debug(`url: ${url}`);
    this.socket = SocketIO.connect('/');

    // register listeners
    this.socket.on('connect', () => console.debug('Socket IO - connect event'));
    this.socket.on('updated', (state) => {
      store.dispatch(roomStateUpdated(state));
    });
  }

  close() {
    console.debug('Socket IO - closing....');
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }
  }

  authenticate({ roomId, playerId, token }) {
    console.debug(`authenticating socket roomId=${roomId}, playerId=${playerId}, token=${token}`);

    return new Promise((resolve, reject) => {
      this.socket.emit('authenticate', {
        playerId, roomId, token,
      }, (reply) => {
        console.debug(`socket authenticate reply=${reply}`);
        if (reply === 'success') {
          console.debug('socket auth resolving');
          resolve(reply);
        } else {
          console.debug('socket auth rejecting');
          reject('Error: socket authenticate failed');
        }
      });
    });
  }
}

const singleton = new Socket();

export default singleton;
