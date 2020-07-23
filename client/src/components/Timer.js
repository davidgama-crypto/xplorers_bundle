import React, { useEffect, useState, useRef } from 'react';
import '../css/Timer.css';
import clockIcon from '../resources/clock.svg';

const Timer = ({ time, endTime, inline }) => {
  const [count, setCount] = useState(time);
  const id = useRef(0);

  let wrapperClass = 'timerWrapperStacked';
  if (inline) wrapperClass = 'timerWrapperInline';

  useEffect(() => {
    if (count > 1) {
      id.current = setTimeout(() => setCount(count - 1), 1000);
    } else {
      endTime();
    }
  }, [count]);

  useEffect(() => () => {
    console.debug('unmounting...');
    clearInterval(id.current);
  }, []);

  let displayText = count;
  if (count >= 60) displayText = `${Math.floor(count / 60)}:${count % 60}`;

  return (
    <div className={wrapperClass}>
      <div className="centered">
        <img className="clockIcon" alt="clock" src={clockIcon} />
      </div>
      <div className="centered">
        <label className="clockText">{displayText}</label>
      </div>
    </div>
  );
};

export default Timer;
