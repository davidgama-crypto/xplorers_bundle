import React from 'react';
import { Redirect } from 'react-router-dom';
import { useRoomState } from '../store';
import GameInstructions from './GameInstructions';
import TestGamePhase from './TestGamePhase';
import LeaderBoard from './LeaderBoard';

const TestGame = () => {
  // const dispatch = useDispatch()
  const { roomState } = useRoomState();

  const endTimeFunction = () => {
    console.debug('endTimeFunction');
  };

  const phaseRenderer = () => {
    switch (roomState.current.phase) {
      case 0:
        return (
          <GameInstructions
            gameTitle="Test Game"
            gameInstructions="Press the button before the timer runs out! Starting in..."
            time={roomState.current.phaseDuration}
            endTime={endTimeFunction}
          />
        );
      case 1:
        return <TestGamePhase gameTime={roomState.current.phaseDuration} />;
      case 2:
        return <LeaderBoard totalScores={roomState.totalScores} />;
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

export default TestGame;
