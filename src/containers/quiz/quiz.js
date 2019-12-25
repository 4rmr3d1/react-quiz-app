import React, { Component } from 'react';

import './quiz.css';

import ActiveQuiz from '../../components/active-quiz';
import FinishedQuiz from "../../components/finished-quiz";
import Spinner from "../../components/UI/spinner";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswer, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render () {

    return (
      <div className="quiz">
        <div className="quiz-wrapper">
          <h1>Answer the questions!</h1>
          {
            !this.props.isLoaded || !this.props.quiz
            ? <Spinner/>
            : this.props.isFinished
              ? <FinishedQuiz
                onRetry={this.props.retryQuiz}
                results={this.props.results}
                quiz={this.props.quiz}
              />
            : <ActiveQuiz
                question={this.props.quiz[this.props.activeQuestion].question}
                answers={this.props.quiz[this.props.activeQuestion].answers}
                onAnswer={this.props.quizAnswer}
                quizLength={this.props.quiz.length}
                activeQuestion={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isLoaded: state.quiz.isLoaded,
    quiz: state.quiz.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    retryQuiz: () => dispatch(retryQuiz()),
    quizAnswer: answerId => dispatch(quizAnswer(answerId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)