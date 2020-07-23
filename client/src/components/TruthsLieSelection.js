import React from 'react';
import '../css/TruthsLieSelection.css';

const TruthsLieSelection = (props) => {

  const optionSelected = (e) => {
    let isLie;
    switch (e.target.id) {
      case 'optionRadio1':
        isLie = props.questions.questions[0].lie;
        break;
      case 'optionRadio2':
        isLie = props.questions.questions[1].lie;
        break;
      case 'optionRadio3':
        isLie = props.questions.questions[2].lie;
        break;
      default:
        break;
    }
    props.optionSelected(isLie, props.playerId);
  };
  return (
    <div className="container-fluid questionsSelDiv">
      <div className="itemHeader">
        <h3 className="bundleFontColor">{props.playerName}</h3>
      </div>
      <div className="form-check itemQuestionOne items">
        <input className="form-check-input" type="radio" name={props.playerId} id="optionRadio1" value="option1" onChange={optionSelected} />
        <label className="form-check-label" htmlFor="exampleRadios1">
          {props.questions.questions[0].question}
        </label>
      </div>
      <div className="form-check itemQuestionTwo items">
        <input className="form-check-input" type="radio" name={props.playerId} id="optionRadio2" value="option2" onChange={optionSelected} />
        <label className="form-check-label" htmlFor="optionRadio2">
          {props.questions.questions[1].question}
        </label>
      </div>
      <div className="form-check itemQuestionThree items">
        <input className="form-check-input" type="radio" name={props.playerId} id="optionRadio3" value="option3" onChange={optionSelected} />
        <label className="form-check-label" htmlFor="optionRadio3">
          {props.questions.questions[2].question}
        </label>
      </div>
    </div>
  );
};
export default TruthsLieSelection;
