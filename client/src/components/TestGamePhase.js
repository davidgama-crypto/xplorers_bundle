import React from 'react';
import Timer from './Timer';
import APIRequestHandler from '../utils/ApiRequestHandler';
import { useRoomState } from '../store';
import PlayerCache from '../utils/PlayerCache';

const TestGamePhase = (props) => {
  const { roomId, roomState } = useRoomState();
  const { id, token } = PlayerCache.getPlayerInfo();
  const { phaseStartTime } = roomState.current;

  // Adding player to the game
  const submitGameInfo = async () => {
    const now = Math.floor(Date.now() / 1000); // now in seconds
    const submitTime = now - phaseStartTime;
    await APIRequestHandler.updatePlayerState(roomId, id, submitTime, token);
    await APIRequestHandler.updatePlayerInfo(roomId, id, { done: true }, token);
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
