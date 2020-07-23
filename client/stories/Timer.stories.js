import React from 'react';
import Timer from '../src/components/Timer';

export default { title: 'Timer', component: 'Timer' };

const noop = () => {
  console.log('timer ended!');
};

export const fiveSecondTimerStacked = () => (
  <Timer
    time={5}
    endTime={noop}
  />
);

export const fiveSecondTimerInline = () => (
  <Timer
    time={5}
    endTime={noop}
    inline
  />
);

export const MultipleMinutesStacked = () => (
  <Timer
    time={150}
    endTime={noop}
  />
);

export const MultipleMinutesInline = () => (
  <Timer
    time={150}
    endTime={noop}
    inline
  />
);
