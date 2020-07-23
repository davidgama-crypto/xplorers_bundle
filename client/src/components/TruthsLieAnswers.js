import React from 'react';
import Timer from './Timer';

const TruthsLieAnswers = ({ playerState, phaseDuration, onPhaseEnd }) => {
  const playerIds = Object.key(playerState);

  return (
    null
    // <div className="container-fluid questionsPanel">
    //   <div className="itemHeader">
    //     <h1 className="bundleTitle">2 TRUTHS, 1 LIE</h1>
    //   </div>
    //   <div className="timer">
    //     <Timer
    //       time={phaseDuration}
    //       endTime={onPhaseEnd}
    //     />
    //   </div>
    //   <div className="itemMessage">
    //     <h4>Select each player’s lie:</h4>
    //   </div>
    //   <div className="questions">
    //     {
    //       Object.entries(props.playerState).map(([key, value]) => renderGame(key, value))
    //     }
    //   </div>
    // </div>
  );
};

export default TruthsLieAnswers;
