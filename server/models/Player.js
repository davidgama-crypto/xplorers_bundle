const { nanoid } = require('nanoid');

class Player {
  constructor() {
    this.id = nanoid();
    this.displayName = '';
    this.done = false;
    this.connected = true;
  }
}

module.exports = Player;
