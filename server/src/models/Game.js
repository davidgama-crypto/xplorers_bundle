const GameRound = require('./GameRound');

class Game {
  constructor(type, rounds) {
    this.type = type;
    this.totalRounds = rounds;
    this.totalPhases = Game.totalPhasesForType(type);
    this.rounds = [];
    const initState = Game.createInitialState(type);
    for (let i = 0; i < this.totalRounds; i += 1) {
      const round = new GameRound(i, initState);
      this.rounds.push(round);
    }
  }

  static createInitialState(type) {
    let initState;
    switch (type) {
      case 'test':
        initState = {};
        break;
      default:
        throw new Error(`Unsupported game type=${type}`);
    }
    return initState;
  }

  static totalPhasesForType(type) {
    let totalPhases;
    switch (type) {
      case 'test':
        totalPhases = 3;
        break;
      default:
        throw new Error(`Unsupported game type=${type}`);
    }
    return totalPhases;
  }
}

module.exports = Game;
