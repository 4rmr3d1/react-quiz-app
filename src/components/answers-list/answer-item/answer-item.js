import React from 'react';
import styles from './answer-item.module.css';

import './answer-item.module.css';

const AnswerItem = ( {state, answer, onAnswer} ) => {

  const liClass = [styles.answerItem];
  
  if(state) {
    liClass.push(styles[state]);
  }

  return (
    <li 
      className={liClass.join(' ')}
      onClick={() => onAnswer(answer.id)}>
      { answer.text }
    </li>
  )
}

export default AnswerItem;