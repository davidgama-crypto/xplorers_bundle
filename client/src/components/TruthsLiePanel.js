import React, { useState } from 'react';
import '../css/TruthsLiePanel.css';
import { useDispatch } from 'react-redux';
import TruthsLieSelection from './TruthsLieSelection';
import { playerIsDone, submitPlayerState } from '../store';
import PlayerCache from '../utils/PlayerCache';
import Timer from './Timer';

const TruthsLiePanel = (props) => {
  const [state, setState] = useState(new Set());
  const dispatch = useDispatch();
  const { id } = PlayerCache.getPlayerInfo();
  const submitted = props.roomState.current.players[id].done;
  const btnText = submitted ? 'Done!' : 'Submit answers!';
  const submitGameInfo = async () => {
    let questions = '';
    Object.entries(props.playerState).map(([key, value]) => {
      if (id === key) {
        questions = value;
      }
      return true;
    });
    const answersArray = Array.from(state);
    const actualQuestions = questions.questions;
    const actualPlayerState = { questions: actualQuestions, answers: answersArray };

    dispatch(submitPlayerState(props.roomState.id, actualPlayerState));
    dispatch(playerIsDone(props.roomState.id));
  };
  const optionSelected = (isLie, playerId) => {
    if (isLie) {
      // add value to the set
      setState((prev) => new Set(prev.add(playerId)));
    } else {
      // Remove value from the set if exists
      setState((prev) => new Set([...prev].filter((player) => player !== playerId)));
    }
  };
  const renderGame = (key, questions) => {
    let playerFiltered;
    for (let i = 0; i < Object.keys(props.roomState.current.players).length; i++) {
      const playerKey = Object.keys(props.roomState.current.players)[i];
      if (key === playerKey) {
        playerFiltered = props.roomState.current.players[playerKey];
      }
    }
    if (id !== playerFiltered.id) {
      console.log(questions);
      let questionArray = Array.from(questions.questions);
      questionArray = questionArray.sort((a, b) => {
        if (a.question > b.question) {
          return 1;
        }
        if (a.question < b.question) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      console.log(questionArray);

      return (
        <TruthsLieSelection
          key={key}
          playerId={playerFiltered.id}
          playerName={playerFiltered.displayName}
          questions={questionArray}
          optionSelected={optionSelected}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <div className="container-fluid questionsPanel">
      <div className="itemHeader">
        <h1 className="bundleTitle">2 TRUTHS, 1 LIE</h1>
      </div>
      <div className="timer">
        <Timer
          time={props.gameTimes}
          endTime={submitGameInfo}
        />
      </div>
      <div className="itemMessage">
        <h4>Select each player’s lie:</h4>
      </div>
      <div className="questions">
        {
          Object.entries(props.playerState).map(([key, value]) => renderGame(key, value))
        }
      </div>
      <div className="itemButton">
        <button type="button" onClick={submitGameInfo} className="roomCreateBtn" disabled={submitted}>{btnText}</button>
      </div>
    </div>
  );
};

export default TruthsLiePanel;
