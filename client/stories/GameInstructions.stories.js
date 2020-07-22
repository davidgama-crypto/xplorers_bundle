import React from 'react';
import GameInstructions from '../src/components/GameInstructions';

export default { title: 'GameInstructions', component: 'GameInstructions' };

const noop = () => {
  console.log('timer ended!');
};

export const TestInstructions = () => (
  <GameInstructions
    gameTitle="Test Game"
    gameInstructions={['Press the button as fast as you can']}
    time={5}
    endTime={noop}
  />
);

export const LongerInstructions = () => (
  <GameInstructions
    gameTitle="Test Game"
    gameInstructions={[
      'Press the button as fast as you can',
      'Keep Reading the instructions',
    ]}
    time={120}
    endTime={noop}
  />
);
