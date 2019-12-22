import React, { Component } from 'react';

import './quiz.css';

import ActiveQuiz from '../../components/active-quiz';
import FinishedQuiz from "../../components/finished-quiz";

export default class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
        question: 'Which color is the sky',
        rightAnswerId: 2,
        answers: [
          {text: 'black', id: 1},
          {text: 'blue', id: 2},
          {text: 'red', id: 3},
          {text: 'green', id: 4}
        ]
      },
      {
        id: 2,
        question: 'When St.Petersburg was invented',
        rightAnswerId: 3,
        answers: [
          {text: '1700', id: 1},
          {text: '1705', id: 2},
          {text: '1703', id: 3},
          {text: '1803', id: 4}
        ]
      }
    ]
  }

  toNextQuestion = () => {
    this.setState({
      answerState: null,
      activeQuestion: this.state.activeQuestion + 1
    })
  }

  onQuizFinished = () => {
    this.setState({ isFinished : true })
  }

  onSetResult = ( id, index ) => {
    if (!id) {
      id = 'right'
    }

    this.setState({
      answerState: {[index]: 'right'},
      results : id
    });
  }

  onAnswer = ( id ) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key]) {
        return 
      }
    }

    const question = this.state.quiz[this.state.activeQuestion],
          results = this.state.results;

    if (id === question.rightAnswerId) {

      this.onSetResult(results[question.id], id);

      // if (!results[question.id]) {
      //   results[question.id] = 'right'
      // }
      //
      // this.setState({
      //   answerState: {[id]: 'right'},
      //   results
      // });

      const timeout = window.setTimeout(() => {
        if ( this.isQuizFinished() ) {
          this.onQuizFinished();
        } else {
          this.toNextQuestion();
        }
        window.clearTimeout(timeout)
      }, 3000)

    } else {
      results[question.id] = 'wrong'
      this.setState({
        answerState: {[id]: 'wrong' },
        results,
      });

      const timeout = window.setTimeout(() => {
        if ( this.isQuizFinished() ) {
          this.onQuizFinished();
        }

        this.toNextQuestion();

        window.clearTimeout(timeout)
      }, 3000)
    }
  }

  onRetry = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
  
  render () {

    const {
      quiz, activeQuestion, answerState, results
    } = this.state;

    return (
      <div className="quiz">
        <div className="quiz-wrapper">
          <h1>quiz</h1>
          {
            this.state.isFinished 
            ? <FinishedQuiz
                onRetry={this.onRetry}
                results={results}
                quiz={quiz}
              />
            : <ActiveQuiz
                question={quiz[activeQuestion].question}
                answers={quiz[activeQuestion].answers}
                onAnswer={this.onAnswer}
                quizLength={quiz.length}
                activeQuestion={activeQuestion + 1}
                state={answerState}
              />
          }
        </div>
      </div>
    )
  }
}