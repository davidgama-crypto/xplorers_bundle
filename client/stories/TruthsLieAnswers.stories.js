import React from 'react';
import TruthsLieAnswers from '../src/components/TruthsLieAnswers';
import Avatar from '../src/utils/Avatars';

export default { title: 'TruthsLieAnswers', component: 'TruthsLieAnswers' };

const player1Id = 'david1234';
const player1Name = 'david';
const player1Avatar = Avatar[0].id;

const player2Id = 'shin2234';
const player2Name = 'shin';
const player2Avatar = Avatar[1].id;

const player3Id = 'sarah3234';
const player3Name = 'sarah';
const player3Avatar = Avatar[2].id;

const players = {
  [player1Id]: {
    displayName: player1Name,
    avatar: player1Avatar,
  },
  [player2Id]: {
    displayName: player2Name,
    avatar: player2Avatar,
  },
  [player3Id]: {
    displayName: player3Name,
    avatar: player3Avatar,
  },
};

const playerState = {
  [player1Id]: {
    questions: [
      {
        question: 'this is a truth',
        lie: false,
      },
      {
        question: 'this is a truth',
        lie: false,
      },
      {
        question: 'this is a lie',
        lie: true,
      },
    ],
    choices: {
      [player2Id]: 1,
      [player3Id]: 2,
    },
  },
  [player2Id]: {
    questions: [
      {
        question: 'this is a truth',
        lie: false,
      },
      {
        question: 'this is a truth',
        lie: false,
      },
      {
        question: 'this is a lie',
        lie: true,
      },
    ],
    choices: {
      [player1Id]: 0,
      [player3Id]: 1,
    },
  },
  [player3Id]: {
    questions: [
      {
        question: 'this is a truth',
        lie: false,
      },
      {
        question: 'this is a truth',
        lie: false,
      },
      {
        question: 'this is a lie',
        lie: true,
      },
    ],
    choices: {
      [player2Id]: 0,
      [player1Id]: 0,
    },
  },

};

const duration = 30;
const noop = () => {};

export const showsAnswers = () => (
  <TruthsLieAnswers
    players={players}
    playerState={playerState}
    phaseDuration={duration}
    onPhaseEnd={noop}
  />
);
