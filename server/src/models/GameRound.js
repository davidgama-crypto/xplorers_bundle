class GameRound {
  constructor(id, initState) {
    this.id = id;
    this.finished = false;
    this.scoredPoints = {};
    this.playerState = {};
    this.initState = initState;
  }
}

module.exports = GameRound;
