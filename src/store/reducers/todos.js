import { VIEW_TODOS, CREATE_TODO, EDIT_TODO, REMOVE_TODO } from '../actions/todos';

const initialState = {
  todos: []
};

const setInStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_TODOS:
      const todos = JSON.parse(localStorage.getItem('todos'));

      return {...state, todos};
    case CREATE_TODO:
      let newTodoList = [...state.todos];
       newTodoList.unshift({
        ...action.payload,
        id: state.todos.length
      });

      setInStorage(newTodoList);
      return {...state, todos: newTodoList};
    case EDIT_TODO:
      let updateTodoList = [...state.todos];

      for (let i = 0; i < updateTodoList.length; i++) {
        console.log(updateTodoList[i].id, action.id);
        if (updateTodoList[i].id === action.id) {
          updateTodoList[i] = action.payload;
          break;
        }
      }

      setInStorage(updateTodoList);

      return {...state, todos: updateTodoList};
    case REMOVE_TODO:
      let removeFromTodoList = [...state.todos],
          cleanedTodoList = removeFromTodoList.filter(todo => todo.id !== action.id);

      setInStorage(cleanedTodoList);
      return {...state, todos: cleanedTodoList};
    default:
      return state;
  }
};

export default todos;