import { SET_TODOS, ADD_TODO, EDIT_TODO, REMOVE_TODO } from '../actionTypes/todos';

export const setTodosAction = (todos) => ({
  type: SET_TODOS,
  todos
});

export const addTodoAction = (payload) => ({
  type: ADD_TODO,
  payload
});

export const editTodoAction = (id, payload) => ({
  type: EDIT_TODO,
  id,
  payload
});

export const removeTodoAction = (id) => ({
  type: REMOVE_TODO,
  id
});