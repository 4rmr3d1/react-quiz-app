import React from 'react';

import './answers-list.css';

import AnswerItem from './answer-item';

const AnswersList = (props) => {
  return (
    <ul className="answers-list">
      { props.answers.map((answer, i) => {
        return (
          <AnswerItem 
            key={i}
            answer={answer}
            onAnswer={props.onAnswer}
            state={props.state ? props.state[answer.id] : null}
          />
        )
      }) }
    </ul>
  )
}

export default AnswersList;