import React from 'react';
import PlayerScore from './PlayerScore';
import {
  useRoomState,
} from '../store';
import '../css/LeaderBoard.css';

const LeaderBoard = () => {
  const {
    roomState,
  } = useRoomState();
  const setPlayersScores = (playerInfo) => {
    let playerFiltered;
    for (let i = 0; i < Object.keys(roomState.current.players).length; i++) {
      const key = Object.keys(roomState.current.players)[i];
      if (playerInfo.playerId === key) {
        playerFiltered = roomState.current.players[key];
      }
    }
    // eslint-disable-next-line max-len
    return <PlayerScore key={playerInfo.playerId} name={playerFiltered.displayName} score={playerInfo.score} playerInfo={playerFiltered} />;
  };
  const title = roomState.current.status === 'finished' ? 'Final Leaderboard' : 'Leaderboard';

  return (
    <div>
      <div>
        <h2 className="bundleTitle">{title}</h2>
      </div>
      <div className="leaderBoardDiv">
        <div className="leaderBoardHeader">
          <div className="playerName items">
            <h3>Player Name</h3>
          </div>
          <div className="score items">
            <h3>Total Points</h3>
          </div>
        </div>
        {roomState.totalScores.map((playerScore) => (
          setPlayersScores(playerScore)
        ))}
      </div>
    </div>

  );
};

export default LeaderBoard;
