import React from 'react';
import '../css/TruthsLiePanel.css';

import Timer from './Timer';
import TruthLieResult from './TruthLieResult';

const TruthsLieAnswers = ({
  players, playerState, phaseDuration, onPhaseEnd,
}) => (
  <div className="container-fluid questionsPanel">
    <div className="itemHeader">
      <h1 className="bundleTitle">2 TRUTHS, 1 LIE Answers</h1>
    </div>
    <div className="timer">
      <Timer
        time={phaseDuration}
        endTime={onPhaseEnd}
      />
    </div>
    <div className="itemMessage">
      <h4>Here are each players actual lies:</h4>
    </div>
    <div className="questions">
      {
          Object.entries(players).map((e) => {
            const [playerId, playerInfo] = e;
            const { displayName } = playerInfo;
            const { choices, questions } = playerState[playerId];
            return (
              <TruthLieResult
                players={players}
                playerId={playerId}
                playerName={displayName}
                playerChoices={choices}
                questions={questions}

              />
            );
          })
        }
    </div>
    <div />
  </div>
);

export default TruthsLieAnswers;
