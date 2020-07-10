const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

const secretKey = 'secret';

class Player {
  constructor(displayName, avatar) {
    this.id = nanoid();
    this.displayName = displayName;
    this.avatar = avatar;
    this.done = false;
    this.connected = true;
    this.token = jwt.sign({ id: this.id }, secretKey);
  }

  toJSON() {
    return {
      displayName: this.displayName,
      avatar: this.avatar,
      done: this.done,
      connected: this.connected,
    };
  }
}

module.exports = Player;
