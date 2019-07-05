import { SET_TODOS, ADD_TODO, EDIT_TODO, REMOVE_TODO } from '../actionTypes/todos';

const initialState = [];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;
    case ADD_TODO:
      return state;
    case EDIT_TODO:
      return state;
    case REMOVE_TODO:
      let todos = JSON.parse(localStorage.getItem('todos'));
      todos = todos.filter(todo => todo.id !== action.id);
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    default:
      return state;
  }
};

export default todos;