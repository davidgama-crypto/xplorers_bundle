import React from 'react';
import PlayerScore from './PlayerScore';
import {
  useRoomState,
} from '../store';

const LeaderBoard = (props) => {
  const {
    roomState,
  } = useRoomState();

  const title = roomState.current.status === 'finished' ? 'Final Leaderboard' : 'Leaderboard';

  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        <ul>
          {props.totalScores.map((playerScore) => (
            <PlayerScore
              key={playerScore.playerId}
              name={playerScore.playerId}
              score={playerScore.score}
            />
          ))}
        </ul>
      </div>
    </div>

  );
};

export default LeaderBoard;
