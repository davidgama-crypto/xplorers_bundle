import React from 'react';
import TruthLieResult from '../src/components/TruthLieResult';

export default { title: 'TruthLieResult', component: 'TruthLieResult' };

const questions = [
  {
    question: 'this should be a truth',
    lie: false,
  },
  {
    question: 'this should be a truth',
    lie: false,
  },
  {
    question: 'this should be a lie',
    lie: true,
  },
];

const playerName = 'david';
const playerId = 'davidId123';
const otherPlayerId = 'shin1234';
const otherPlayerName = 'shin';
const otherPlayer2Id = 'sarah1234';
const otherplayer2Name = 'sarah';

const players = {
  [playerId]: {
    displayName: playerName,
    avatar: 'BUNNY_AVATAR',
  },
  [otherPlayerId]: {
    displayName: otherPlayerName,
    avatar: 'DUCK_AVATAR',
  },
  [otherPlayer2Id]: {
    displayName: otherplayer2Name,
    avatar: 'FROG_AVATAR',
  },
};
const playerChoices = {
  [otherPlayerId]: 1,
  [otherPlayer2Id]: 0,
};

export const showsPlayerAnswers = () => (
  <TruthLieResult
    players={players}
    playerChoices={playerChoices}
    questions={questions}
    playerName={playerName}
    playerId={playerId}
  />
);
