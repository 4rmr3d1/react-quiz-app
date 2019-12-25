import React, {Component} from 'react';
import styles from './quiz-creator.module.css';

import Button from "../../components/UI/button";
import Input from "../../components/UI/input";
import Select from "../../components/UI/select";
import {createControl, validate, validateForm} from '../../form/form-validation';
import {connect} from "react-redux";
import {createQuizQuestion, finishQuizCreate} from "../../store/actions/create";

function createOptionControl(number) {
  return createControl({
    label: `Option ${number}`,
    errorMessage: `Field can't be empty`,
    id: number,
  }, {required : true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter the question',
      errorMessage: `Field can't be empty`,
    }, {required : true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {

  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = event => {
    event.preventDefault();

    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    this.props.createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  };

  createQuizHandler = async (event) => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
    this.props.finishCreateQuiz()
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  };

  selectChangeHandler = ( event ) => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  renderControls () {
    return Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName]

        return (
          <React.Fragment key={controlName + index} >
            <Input
              label={control.label}
              value={control.value}
              valid={control.valid}
              shouldValidate={!!control.validation}
              touched={control.touched}
              errorMessage={control.errorMessage}
              onChange={event => this.onChangeHandler(event.target.value, controlName)}
            />
            { index === 0 ? <hr /> : null}
          </React.Fragment>
        )
      })
  }

  render() {
    const select = <Select
      label='Choose right answer'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />

    return (
      <div className={styles.QuizCreator}>
        <div>
          <h1>Create a Quiz</h1>

          <form onSubmit={this.submitHandler}>

            { this.renderControls() }

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add the Question
            </Button>

            <Button
              type="right"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Create the Quiz
            </Button>

          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishQuizCreate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);

