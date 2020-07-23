import React from 'react';
import { Redirect } from 'react-router-dom';
import GameInstructions from './GameInstructions';
import LeaderBoard from './LeaderBoard';
import TruthsLiesQuestions from './TruthsLiesQuestions';
import TruthsLiePanel from './TruthsLiePanel';

const TruthsLieGame = (props) => {
  const endTimeFunction = () => {
    console.debug('endTimeFunction');
  };

  const phaseRenderer = () => {
    switch (props.roomState.current.phase) {
      case 0:
        return (
          <GameInstructions
            gameTitle="2 Truths 1 Lie"
            gameInstructions="..................."
            time={props.roomState.current.phaseDuration}
            endTime={endTimeFunction}
          />
        );
      case 1:
        return (
          <TruthsLiesQuestions
            gameTimes={props.roomState.current.phaseDuration}
            roomState={props.roomState}
          />
        );
      case 2:
        return (
          <TruthsLiePanel
            gameTimes={props.roomState.current.phaseDuration}
            roomState={props.roomState}
            playerState={props.roomState.gameData[props.roomState.current.game].rounds[props.roomState.current.round].playerState}
          />
        );
      case 3:
        return <LeaderBoard totalScores={props.roomState.totalScores} />;
      default:
        return <Redirect to="/" />;
    }
  };

  return (
    <div>
      {phaseRenderer()}
    </div>

  );
};

export default TruthsLieGame;
