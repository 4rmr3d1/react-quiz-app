import React from 'react';
import { Link } from 'react-router-dom';
import styles from './finished-quiz.module.css';

import Button from '../UI/button';

const FinishedQuiz = ( {quiz, results, onRetry} ) => {
  const rightAnswers =
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

      <p>Правильно {rightAnswers} / {quiz.length}</p>

      <div>
        <Button onClick={onRetry} type="primary"> Retry </Button>
        <Link to="/">
          <Button type="right"> Home </Button>
        </Link>
      </div>

    </div>
  )
}

export default FinishedQuiz;

