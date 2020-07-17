import React from 'react';
import logo from '../resources/bundleLogo.png';
import '../css/PlayerScore.css';

const PlayerScore = (props) => (
  <div className="playerScoreDiv">
    <div>
      <img className="logo" src={logo} alt="Logo" />
    </div>
    <div>
      <span>{props.name}</span>
    </div>
    <div>
      <span>{props.score}</span>
    </div>
  </div>

);

export default PlayerScore;
