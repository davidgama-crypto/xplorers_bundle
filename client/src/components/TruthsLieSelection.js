import React, { useState } from 'react';
import '../css/TruthsLieSelection.css';

const TruthsLieSelection = (props) => {
  const { readOnly, selectedQuestionNumber } = props;
  let initialCheckedState = [false, false, false];
  if (selectedQuestionNumber !== undefined) {
    initialCheckedState[selectedQuestionNumber] = true;
  }

  let optionSelected = () => {};
  if (readOnly === true) {
    initialCheckedState = props.questions.map((e) => e.lie);
  }

  console.log('rendering truths lie selection');
  console.log('initial state');
  console.log(initialCheckedState);

  const [checkedState, setChecked] = useState(initialCheckedState);

  if (!readOnly) {
    console.log('not readonly, attaching handler');
    optionSelected = (e) => {
      console.log('options selected running');
      let isLie;
      let questionNum;
      switch (e.target.id) {
        case 'optionRadio1':
          isLie = props.questions[0].lie;
          checkedState[0] = !checkedState[0];
          questionNum = 0;
          break;
        case 'optionRadio2':
          isLie = props.questions[1].lie;
          checkedState[1] = !checkedState[1];
          questionNum = 1;
          break;
        case 'optionRadio3':
          isLie = props.questions[2].lie;
          checkedState[2] = !checkedState[2];
          questionNum = 2;
          break;
        default:
          break;
      }
      props.optionSelected(isLie, props.playerId, questionNum);
      setChecked(checkedState);
    };
  }

  return (
    <div className="container-fluid questionsSelDiv">
      <div className="itemHeader">
        <h3 className="bundleFontColor">{props.playerName}</h3>
      </div>
      <div className="form-check itemQuestionOne items">
        <input disabled={!!readOnly} checked={checkedState[0]} className="form-check-input" type="radio" name={props.playerId} id="optionRadio1" value="option1" onChange={optionSelected} />
        <label className="form-check-label" htmlFor="exampleRadios1">
          {props.questions[0].question}
        </label>
      </div>
      <div className="form-check itemQuestionTwo items">
        <input disabled={!!readOnly} checked={checkedState[1]} className="form-check-input" type="radio" name={props.playerId} id="optionRadio2" value="option2" onChange={optionSelected} />
        <label className="form-check-label" htmlFor="optionRadio2">
          {props.questions[1].question}
        </label>
      </div>
      <div className="form-check itemQuestionThree items">
        <input disabled={!!readOnly} checked={checkedState[2]} className="form-check-input" type="radio" name={props.playerId} id="optionRadio3" value="option3" onChange={optionSelected} />
        <label className="form-check-label" htmlFor="optionRadio3">
          {props.questions[2].question}
        </label>
      </div>
    </div>
  );
};
export default TruthsLieSelection;
