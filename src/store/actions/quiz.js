import axios from 'axios';
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  SET_ANSWER_STATE,
  SET_QUIZ_FINISHED,
  SET_NEXT_QUESTION,
  RETRY_QUIZ
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try
    {
      const response = await axios.get('https://react-quiz-app-2617d.firebaseio.com/quizes.json')

      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test #${index + 1}`
        })
      });

      dispatch(fetchQuizesSuccess(quizes))
    }
    catch (e)
    {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try
    {
      const response = await axios.get(`https://react-quiz-app-2617d.firebaseio.com/quizes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz))
    }
    catch (e)
    {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function setAnswerState(answerState, results) {
  return {
    type: SET_ANSWER_STATE,
    answerState, results
  }
}

export function setQuizFinished() {
  return {
    type: SET_QUIZ_FINISHED
  }
}

export function setNextQuestion(nextQuestion) {
  return {
    type: SET_NEXT_QUESTION,
    nextQuestion
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function quizAnswer(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'right') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {

      if (!results[question.id]) {
        results[question.id] = 'right'
      }

      dispatch(setAnswerState({[answerId]: 'right'}, results))

      const timeout = window.setTimeout(() => {
        if ( isQuizFinished(state) ) {
          dispatch( setQuizFinished() );
        } else {
          dispatch( setNextQuestion(state.activeQuestion + 1) )
        }
        window.clearTimeout(timeout)
      }, 3000)

    } else {
      results[question.id] = 'wrong'

      dispatch(setAnswerState({[answerId]: 'wrong'}, results))

      const timeout = window.setTimeout(() => {
        if ( isQuizFinished(state) ) {
          dispatch( setQuizFinished() );
        }
        dispatch( setNextQuestion(state.activeQuestion + 1) )
        window.clearTimeout(timeout)
      }, 3000)
    }
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}
