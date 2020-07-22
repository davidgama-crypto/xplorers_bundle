import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayerScore from './PlayerScore';
import {
  useRoomState,
  clearRoom,
} from '../store';
import '../css/LeaderBoard.css';

const LeaderBoard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    roomState,
  } = useRoomState();
  const setPlayersScores = (playerInfo) => {
    let playerFiltered;
    for (let i = 0; i < Object.keys(roomState.current.players).length; i += 1) {
      const key = Object.keys(roomState.current.players)[i];
      if (playerInfo.playerId === key) {
        playerFiltered = roomState.current.players[key];
      }
    }
    // eslint-disable-next-line max-len
    return <PlayerScore key={playerInfo.playerId} name={playerFiltered.displayName} score={playerInfo.score} playerInfo={playerFiltered} />;
  };

  const gameIsFinished = roomState.current.status === 'finished';

  const title = gameIsFinished ? 'Final Leaderboard' : 'Leaderboard';

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
      <div className="goHomeDiv">
        <button
          className="goHomeBtn"
          onClick={() => {
            dispatch(clearRoom());
            history.push('/');
          }}
        >
          Play Again
        </button>
      </div>
    </div>

  );
};

export default LeaderBoard;
