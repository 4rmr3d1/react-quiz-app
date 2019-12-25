import React from 'react';

import './active-quiz.css';

import AnswersList from '../answers-list';

const ActiveQuiz = (props) => {

  const {
    question, answers, onAnswer, quizLength, activeQuestion, state
  } = props;

  return (
    <div className="active-quiz">
      <p className="question">
        <span>
          <strong>{activeQuestion}</strong>&nbsp;
          {question}
        </span>

        <small>{activeQuestion} / {quizLength}</small>
      </p>

      <AnswersList
        state={state}
        answers={answers}
        onAnswer={onAnswer}
      />
    </div>
  )
}

export default ActiveQuiz;