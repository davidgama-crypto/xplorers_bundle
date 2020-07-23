import React from 'react';
import TruthsLiesQuestions from '../src/components/TruthsLiesQuestions';

export default { title: 'Truth Lies QuestionsInput', component: 'TruthLiesQuestions' };

const props = {
  gameTimes: 60,
};

export const truthsLiesQuestions = () => <TruthsLiesQuestions truthsLies={props} />;
