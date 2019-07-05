
export const VIEW_TODOS = 'VIEW_TODOS';
export const viewTodosAction = () => ({
  type: VIEW_TODOS
});


export const CREATE_TODO = 'CREATE_TODO';
export const createTodoAction = (payload) => ({
  type: CREATE_TODO,
  payload
});

export const EDIT_TODO = 'EDIT_TODO';
export const editTodoAction = (id, payload) => ({
  type: EDIT_TODO,
  id,
  payload
});

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodoAction = (id) => ({
  type: REMOVE_TODO,
  id
});