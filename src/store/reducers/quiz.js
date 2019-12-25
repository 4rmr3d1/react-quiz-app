import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, RETRY_QUIZ,
  SET_ANSWER_STATE, SET_NEXT_QUESTION, SET_QUIZ_FINISHED
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  isLoaded: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
}

export default function quizReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, isLoaded: false
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, isLoaded: true, quizes: action.quizes
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state, isLoaded: true, error: action.error
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state, isLoaded: true, quiz: action.quiz
      };
    case SET_ANSWER_STATE:
      return {
        ...state, answerState: action.answerState, results: action.results
      };
    case SET_QUIZ_FINISHED:
      return {
        ...state, isFinished: true,
      };
    case SET_NEXT_QUESTION:
      return {
        ...state, answerState: null, activeQuestion: action.nextQuestion
      };
    case RETRY_QUIZ:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      };
    default:
      return state
  }

}