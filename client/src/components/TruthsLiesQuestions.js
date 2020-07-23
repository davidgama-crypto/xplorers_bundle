import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Timer from './Timer';
import '../css/TruthsLiesQuestions.css';
import { playerIsDone, submitPlayerState } from '../store';
import PlayerCache from '../utils/PlayerCache';

const TruthsLiesQuestions = (props) => {
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [lie, setLie] = useState('');
  const dispatch = useDispatch();
  const roomId = props.roomState.id;
  const { id } = PlayerCache.getPlayerInfo();
  const submitted = props.roomState.current.players[id].done;
  const btnText = submitted ? 'Done!' : 'Submit your response!';
  const handleChange = async (e) => {
    switch (e.target.id) {
      case 'truth1Input':
        setQuestionOne(e.target.value);
        break;
      case 'truth2Input':
        setQuestionTwo(e.target.value);
        break;
      case 'lieInput':
        setLie(e.target.value);
        break;
      default:
        break;
    }
  };
  const submitGameInfo = async () => {
    const questions = {
      questions: [
        { question: questionOne, lie: false },
        { question: questionTwo, lie: false },
        { question: lie, lie: true },
      ],
    };
    dispatch(submitPlayerState(roomId, questions));
    dispatch(playerIsDone(roomId));
  };
  return (
    <div className="container-fluid questionsDiv">
      <div className="itemHeader">
        <h1 className="bundleTitle">2 TRUTHS, 1 LIE</h1>
      </div>
      <div className="timer">
        <Timer
          time={props.gameTimes}
          endTime={submitGameInfo}
        />
      </div>
      <div className="form-group itemTruthOne itemQuestions">
        <label htmlFor="truth1Input">Truth #1;</label>
        <input type="text" className="form-control form-control-lg" id="truth1Input" placeholder="Truth #1" onChange={handleChange} />
      </div>
      <div className="form-group itemTruthTwo itemQuestions">
        <label htmlFor="truth2Input">Truth #2:</label>
        <input type="text" className="form-control form-control-lg" id="truth2Input" placeholder="Truth #2" onChange={handleChange} />
      </div>
      <div className="form-group itemLie itemQuestions">
        <label htmlFor="lieInput">Lie:</label>
        <input type="text" className="form-control form-control-lg" id="lieInput" placeholder="Lie" onChange={handleChange} />
      </div>
      <div className="itemButtons">
        <button type="button" onClick={submitGameInfo} className="submitBtn" disabled={submitted}>{btnText}</button>
      </div>
    </div>

  );
};

export default TruthsLiesQuestions;
