import { createStore, combineReducers } from 'redux';
// Reducers
import notifyReducer from 'react-redux-notify';
import todos from './reducers/todos';

const store = createStore(combineReducers({
  notifications: notifyReducer,
  todos
}));

export default store;