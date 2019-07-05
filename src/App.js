import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import { Notify } from 'react-redux-notify';
import 'react-redux-notify/dist/ReactReduxNotify.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TodoList from './components/TodoList';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Notify />
        <Router>
          <Switch>
            <Route path="/todo-list" exact component={TodoList} />
            <Redirect to="/todo-list" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
