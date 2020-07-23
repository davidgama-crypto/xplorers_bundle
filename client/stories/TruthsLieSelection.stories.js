import React from 'react';
import TruthsLieSelection from '../src/components/TruthsLieSelection';

export default { title: 'Truth Lie Player Panel', component: 'TruthsLieSelection' };

const props = {
  playerName: 'Player Name',
  optionOne: 'Question One',
  optionTwo: 'Question Two',
  optionThree: 'Question Three',
};

export const truthLieSelection = () => <TruthsLieSelection truthsLies={props} />;
