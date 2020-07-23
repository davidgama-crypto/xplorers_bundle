import React from 'react';
import { Redirect } from 'react-router-dom';
import GameInstructions from './GameInstructions';
import LeaderBoard from './LeaderBoard';
import TruthsLiesQuestions from './TruthsLiesQuestions';
import TruthsLiePanel from './TruthsLiePanel';
import TruthsLieAnswers from './TruthsLieAnswers';

const TruthsLieGame = (props) => {
  const endTimeFunction = () => {
    console.debug('endTimeFunction');
  };

  const { roomState } = props;
  const { current, gameData } = roomState;
  const {
    game, round, players, phaseDuration,
  } = current;
  const currentGameData = gameData[game].rounds[round];
  const { playerState } = currentGameData;

  const phaseRenderer = () => {
    switch (props.roomState.current.phase) {
      case 0:
        return (
          <GameInstructions
            gameTitle="2 Truths 1 Lie"
            gameInstructions={['You will have 1 minute to type 2 things about you that are true and 1 thing that is a lie.',
              'You will then submit it and after 1 minute, you will be presented with each player’s answers.',
              'You will have 2 minutes to guess all the lies from each of the players.']}
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
        return (
          <TruthsLieAnswers
            players={players}
            playerState={playerState}
            phaseDuration={phaseDuration}
            onPhaseEnd={() => {}}
          />
        );
      case 4:
        return <LeaderBoard totalScores={props.roomState.totalScores} />;
      default:
        return <Redirect push to="/" />;
    }
  };

  return (
    <div>
      {phaseRenderer()}
    </div>

  );
};

export default TruthsLieGame;
