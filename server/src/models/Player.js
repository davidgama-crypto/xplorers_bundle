const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/constants');

class Player {
  constructor(displayName, avatar) {
    this.id = nanoid();
    this.displayName = displayName;
    this.avatar = avatar;
    this.done = false;
    this.connected = false;
    this.ready = false;
    this.token = jwt.sign({ id: this.id }, JWT_SECRET);
  }
}

module.exports = Player;
