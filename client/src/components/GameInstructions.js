import React from 'react';
import Timer from './Timer';
import '../css/GameInstructions.css';

const GameInstructions = ({
  gameTitle, gameInstructions, time, endTime, footer,
}) => (
  <div className="gameInstructionsWrapper">
    <div className="instructionsSection">
      <h1 className="gameInstructionsTitle">{gameTitle}</h1>
    </div>
    <div className="instructionsSection">
      <h2 className="gameInstructionsSubheader">How to play</h2>
    </div>
    <div className="instructionsSection">
      <Timer
        time={time}
        endTime={endTime}
      />
    </div>
    <div className="instructionsSection">
      {gameInstructions.map((e, i) => <label key={e} className="gameInstruction">{`${i + 1}) ${e}`}</label>)}

    </div>
    <div className="instructionsSection">
      <h3>{footer || 'Good luck, have fun!'}</h3>
    </div>

  </div>

);

export default GameInstructions;
