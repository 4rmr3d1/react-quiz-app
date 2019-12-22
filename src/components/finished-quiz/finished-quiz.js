import React from 'react';
import styles from './finished-quiz.module.css';

import Button from '../UI/button';

const FinishedQuiz = ( {quiz, results, onRetry} ) => {
  const rigthAnswers =
    Object
      .keys(results)
      .reduce((total, key) => {
        if (results[key] === 'right') {
          total++
        }
        return total;
      }, 0);



  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        {
          quiz.map((quizItem, i) => {

            const iClasses = [
              'fa',
              results[quizItem.id] === 'wrong' ? 'fa-times' : 'fa-check',
              styles[results[quizItem.id]]
            ]

            return (
              <li key={i}>
                <strong>{i + 1}</strong>.&nbsp;
                {quizItem.question}
                <i className={iClasses.join(' ')} />
              </li>
            )
          })
        }
      </ul>

      <p>Правильно {rigthAnswers} / {quiz.length}</p>

      <div>
        <Button onClick={onRetry} type="primary"> Retry </Button>
        <Button type="right"> Home </Button>
      </div>

    </div>
  )
}

export default FinishedQuiz;

