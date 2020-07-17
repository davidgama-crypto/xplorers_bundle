import React, { useEffect, useState, useRef } from 'react';

const Timer = (props) => {
  const [count, setCount] = useState(props.time);
  const id = useRef(0);

  useEffect(() => {
    if (count > 0) {
      id.current = setTimeout(() => setCount(count - 1), 1000);
    } else {
      props.endTime();
    }
  }, [count]);

  useEffect(() => () => {
    console.debug('unmounting...');
    clearInterval(id.current);
  }, []);

  return (
    <div>
      Countdown:
      {' '}
      {count}
    </div>
  );
};

export default Timer;
