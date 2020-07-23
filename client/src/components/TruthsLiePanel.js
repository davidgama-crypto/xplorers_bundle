import React, { useState } from 'react';
import '../css/TruthsLiePanel.css';
import { useDispatch } from 'react-redux';
import TruthsLieSelection from './TruthsLieSelection';
import { playerIsDone, submitPlayerState } from '../store';
import PlayerCache from '../utils/PlayerCache';
import Timer from './Timer';

const TruthsLiePanel = (props) => {
  console.log('inside rendering truths lie panel');

  // {
  //   'playerId': {
  //     choice: 0,
  //     correct: true
  //   }
  // }

  const [state, setState] = useState({});
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
    // array of player ids for which this player was correct
    const answersArray = [];
    // map of playerids and question number for this players choices
    const playerChoices = {};

    Object.entries(state).forEach((e) => {
      const [playerId, info] = e;
      const { choice, correct } = info;
      if (correct) answersArray.push(playerId);
      playerChoices[playerId] = choice;
    });
    const actualQuestions = questions.questions;
    const actualPlayerState = { questions: actualQuestions, answers: answersArray, choices: playerChoices };

    dispatch(submitPlayerState(props.roomState.id, actualPlayerState));
    dispatch(playerIsDone(props.roomState.id));
  };
  const optionSelected = (isLie, playerId, questionNumber) => {
    console.log('calling truth lie panel options selected');
    state[playerId] = {
      choice: questionNumber,
    };
    if (isLie) {
      // add value to the set
      state[playerId].correct = true;
    } else {
      state[playerId].correct = false;
    }
    console.log('setting state');
    console.log(state);
    setState({ ...state });
  };
  const renderGame = (key, playerState) => {
    console.log('inside render game');
    let playerFiltered;
    for (let i = 0; i < Object.keys(props.roomState.current.players).length; i++) {
      const playerKey = Object.keys(props.roomState.current.players)[i];
      if (key === playerKey) {
        playerFiltered = props.roomState.current.players[playerKey];
      }
    }
    // if not the current player
    if (id !== playerFiltered.id) {
      console.log('not the current player');
      console.log(playerState);
      let questionArray = Array.from(playerState.questions);
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
      console.log(state);
      console.log(key);

      let selected;
      if (state[key] && state[key].choice) {
        selected = state[key].choice;
      }

      return (
        <TruthsLieSelection
          key={key}
          playerId={playerFiltered.id}
          playerName={playerFiltered.displayName}
          questions={questionArray}
          optionSelected={optionSelected}
          selectedQuestionNumber={selected}
        />
      );
    }
    return null;
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
          Object.entries(props.playerState).map(([somePlayerId, theirState]) => renderGame(somePlayerId, theirState))
        }
      </div>
      <div className="itemButton">
        <button type="button" onClick={submitGameInfo} className="roomCreateBtn" disabled={submitted}>{btnText}</button>
      </div>
    </div>
  );
};

export default TruthsLiePanel;
