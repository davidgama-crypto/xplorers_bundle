import React from 'react';
import '../css/PlayerScore.css';
import AvatarPlayer from './AvatarPlayer';

const PlayerScore = (props) => (
  <div className="playerScoreDiv">
    <div className="avatar playerScoreItems">
      <AvatarPlayer isHost={false} isReady={false} key={props.playerInfo.playerId} playerInfo={props.playerInfo} />
    </div>
    <div className="playerName playerScoreItems">
      <h3>{props.name}</h3>
    </div>
    <div className="score playerScoreItems">
      <h3>{props.score}</h3>
    </div>
  </div>

);

export default PlayerScore;
