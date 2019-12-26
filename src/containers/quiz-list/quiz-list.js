import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

import './quiz-list.css';
import Spinner from "../../components/UI/spinner";
import {fetchQuizes} from "../../store/actions/quiz";


class QuizList extends Component {

  componentDidMount() {
    this.props.fetchQuizes();
  }


  renderQuizes () {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      );
    })
  }

  render() {
    return (
      <div className='quiz-list'>

          <h1>List of Quizes</h1>

          {
            !this.props.isLoaded && this.props.quizes.length !== 0
              ? <Spinner/>
              : <ul>
                  { this.renderQuizes() }
                </ul>
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    isLoaded: state.quiz.isLoaded,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
