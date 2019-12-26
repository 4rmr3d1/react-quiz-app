import React from 'react';
import { Link } from 'react-router-dom';
import './finished-quiz.css';

import Button from '../UI/button';

const FinishedQuiz = ( {quiz, results, onRetry} ) => {

  const rightAnswers =
    Object
      .keys(results)
      .reduce((total, key) => {
        if (results[key] === 'success') {
          total++
        }
        return total;
      }, 0);

  return (
    <div className='finished-quiz jumbotron'>
      <ul>
        {
          quiz.map((quizItem, i) => {

            const iClasses = [
              'fa',
              results[quizItem.id] === 'danger' ? 'fa-times' : 'fa-check',
              `text-${[results[quizItem.id]]}`
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
        <Button onClick={onRetry} type='primary'> Retry </Button>
        <Link to="/">
          <Button type='info'> Home </Button>
        </Link>
      </div>

    </div>
  )
}

export default FinishedQuiz;

