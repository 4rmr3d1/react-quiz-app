import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";

import Layout from './hoc/layout';
import Quiz from './containers/quiz';
import QuizCreator from "./containers/quiz-creator";
import QuizList from "./containers/quiz-list";
import Auth from "./containers/auth";
import Logout from "./components/logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render () {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" component={QuizList} exact/>
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isLogged) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator}/>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" component={QuizList} exact/>
          <Redirect to="/"/>
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogged: !!state.auth.token
  }
}

function dispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, dispatchToProps)(App));
