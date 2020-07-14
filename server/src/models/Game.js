const GameRound = require('./GameRound');

class Game {
  constructor(type, rounds) {
    this.type = type;
    this.totalRounds = rounds;
    this.totalPhases = Game.totalPhasesForType(type);
    this.phaseDurations = Game.phaseDurationsForGame(type);
    this.rounds = [];
    const initState = Game.createInitialState(type);
    for (let i = 0; i < this.totalRounds; i += 1) {
      const round = new GameRound(i, initState);
      this.rounds.push(round);
    }
  }

  // Returns a unique initial game state for each type
  // takes in type and returns object
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

  // Return an array of phase durations in seconds
  static phaseDurationsForGame(type) {
    let durations;
    switch (type) {
      case 'test':
        durations = [
          1,
          10,
          5,
        ];
        break;
      default:
        throw new Error(`Unsupported game type=${type}`);
    }
    return durations;
  }

  // Returns a unique scoring function for each game type
  // takes in type and playerState returns an int
  static calculateScoreForGame(type, playerState) {
    let fn;
    switch (type) {
      case 'test':
        // should be a number
        fn = (singlePlayerState) => 10 * singlePlayerState;
        break;
      default:
        throw new Error(`Unsupported game type=${type}`);
    }
    return fn(playerState);
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
