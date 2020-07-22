import React from 'react';
import { useDispatch } from 'react-redux';
import Timer from './Timer';
import { useRoomState, playerIsDone, submitPlayerState } from '../store';
import PlayerCache from '../utils/PlayerCache';

const TestGamePhase = (props) => {
  const { roomId, roomState } = useRoomState();
  const { id } = PlayerCache.getPlayerInfo();
  const { phaseStartTime } = roomState.current;
  const dispatch = useDispatch();

  // Adding player to the game
  const submitGameInfo = async () => {
    const now = Math.floor(Date.now() / 1000); // now in seconds
    const submitTime = now - phaseStartTime;
    dispatch(submitPlayerState(roomId, submitTime));
    dispatch(playerIsDone(roomId));
  };

  const submitted = roomState.current.players[id].done;
  const btnText = submitted ? 'Done!' : 'Click me now!';

  return (
    <div>
      <div>
        <Timer
          time={props.gameTime}
          endTime={submitGameInfo}
        />
      </div>
      <div>
        <button type="button" onClick={submitGameInfo} className="roomCreateBtn" disabled={submitted}>{btnText}</button>

      </div>
    </div>

  );
};

export default TestGamePhase;
