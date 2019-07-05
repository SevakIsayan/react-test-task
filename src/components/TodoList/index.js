import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { viewTodosAction, editTodoAction, removeTodoAction } from '../../store/actions/todos';
import { populateTodosRequest } from './http.service';
import { createNotification, NOTIFICATION_TYPE_SUCCESS } from 'react-redux-notify';
import { Container, Card, CardHeader, Button } from '@material-ui/core';
import Loading from '../Loading';
import TodoModal from "./TodoModal";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageLoading: true,
      editTodoItem: {},
      showCreateTodoModal: false,
      showEditTodoModal: false
    };
  }

  componentDidMount() {
   this.getTodoList();
   this.setState({ pageLoading: false });
  }

  populateTodos = async () => {
    await populateTodosRequest();
    this.getTodoList();
  };

  getTodoList() {
    this.props.viewTodoList();
    this.props.createNotification({
      message: 'Todos list loaded successfully',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 1000
    });
  }

  openAddTodoForm() {
    this.setState({
      showCreateTodoModal: true
    });
  }

  openEditTodoForm(todo) {
    let todoForm = {
      id: todo.id,
      title: todo.title,
      body: todo.body
    };

    this.setState({ todoForm, showEditTodoModal: true });
  }

  removeTodo(todoId) {
    this.props.removeTodo(todoId);

    this.props.createNotification({
      message: 'Todo removed successfully',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 1000
    });
  }

  render() {
    if (this.state.pageLoading) {
      return (<Loading/>);
    } else {
      return (
        <Container className="todo-list" maxWidth="sm">
          <div className="list-controls">
            <Button variant="contained" color="primary" onClick={this.populateTodos}>Populate</Button>
            <Button variant="contained" color="primary" onClick={() => this.openAddTodoForm()}>+Add</Button>
            <TodoModal
                newTodo
                show={this.state.showCreateTodoModal}
                close={() => this.setState({showCreateTodoModal: false})}
            />
          </div>
          {this.props.todos && this.props.todos.map((todo, k) => (
            <Card className="todo" key={k}>
              <CardHeader
                title={todo.title}
                subheader={todo.body}
                action={
                  <div>
                    <Button color="primary" onClick={() => this.openEditTodoForm(todo)}>Edit</Button>
                    <Button color="secondary" onClick={() => this.removeTodo(todo.id)}>Remove</Button>
                  </div>
                }
              />
            </Card>
          ))}

          <TodoModal
              show={this.state.showEditTodoModal}
              todo={this.state.todoForm}
              close={() => this.setState({showEditTodoModal: false})}
          />
        </Container>
      );
    }
  }
}

const mapStateToProps = function (state) {
  return {
    todos: state.todos.todos
  }
};

const mapDispatchToProps = function (dispatch) {
  return {
    createNotification: (config) => dispatch(createNotification(config)),
    viewTodoList: (todos) => dispatch(viewTodosAction(todos)),
    editTodo: (id, payload) => dispatch(editTodoAction(id, payload)),
    removeTodo: (id) => dispatch(removeTodoAction(id))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);