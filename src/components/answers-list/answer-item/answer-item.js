import React from 'react';
import './answer-item.css';

import './answer-item.css';

const AnswerItem = ( {state, answer, onAnswer} ) => {

  const liClass = [
    'answer-item',
    'list-group-item',
    'list-group-item-action',
    state ? `bg-${state}` : null
  ];

  return (
    <li 
      className={liClass.join(' ')}
      onClick={() => onAnswer(answer.id)}>
      { answer.text }
    </li>
  )
}

export default AnswerItem;