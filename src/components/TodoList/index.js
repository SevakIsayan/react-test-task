import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { setTodosAction, addTodoAction, editTodoAction, removeTodoAction } from '../../store/actions/todos';
import { populateTodosRequest } from './http.service';
import { createNotification, NOTIFICATION_TYPE_SUCCESS } from 'react-redux-notify';
import { Container, Card, CardHeader, Button, Dialog, DialogTitle, Input } from '@material-ui/core';
import Loading from '../Loading';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageLoading: true,
      openedForm: null
    };
  }

  componentDidMount() {
   this.getTodoList();
   this.setState({ pageLoading: false });
  }

  async populateTodos() {
    await populateTodosRequest();
    this.getTodoList();
    this.props.createNotification({
      message: 'Todos list populated successfully',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 1000
    });
  }

  getTodoList() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    this.props.setTodos(todos);
    this.props.createNotification({
      message: 'Todos list loaded successfully',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 1000
    });
  }

  openAddTodoForm() {
    this.setState({
      openedForm: {
        title: null,
        body: null
      }
    });
  }

  openEditTodoForm(todo) {
    this.setState({
      openedForm: todo
    });
  }

  removeTodo(id) {
    this.props.removeTodo(id);
    this.props.createNotification({
      message: 'Todo removed successfully',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 1000
    });
  }

  onTodoFormChange(e) {
    let openedForm = this.state.openedForm;

    openedForm[e.name] = e.value;

    this.setState({ openedForm });
  }

  render() {
    if (this.state.pageLoading) {
      return (<Loading/>);
    } else {
      return (
        <Container className="todo-list" maxWidth="sm">
          <div className="list-controls">
            <Button variant="contained" color="primary" onClick={() => this.populateTodos()}>Populate</Button>
            <Button variant="contained" color="primary" onClick={() => this.openAddTodoForm()}>+Add</Button>
            <Dialog open={!!this.state.openedForm && !this.state.openedForm.id}>
              <DialogTitle>Add todo</DialogTitle>
              <form className="todo-form" onChange={(e) => this.onTodoFormChange(e.target)}>
                <Input className="field" name="title" placeholder="Title" />
                <Input className="field" name="body" placeholder="Description" />
                <Button className="field" variant="contained" color="primary">Add</Button>
              </form>
            </Dialog>
          </div>
          {this.props.todos.map((todo, k) => (
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
          <Dialog open={!!this.state.openedForm && !!this.state.openedForm.id}>
            <DialogTitle>Edit todo</DialogTitle>
            <form className="todo-form" onChange={(e) => this.onTodoFormChange(e.target)}>
              <Input className="field" name="title" placeholder="Title" />
              <Input className="field" name="body" placeholder="Description" />
              <Button className="field" variant="contained" color="primary">Save</Button>
            </form>
          </Dialog>
        </Container>
      );
    }
  }
}

const mapStateToProps = function (state) {
  return {
    todos: state.todos
  }
};

const mapDispatchToProps = function (dispatch) {
  return {
    createNotification: (config) => dispatch(createNotification(config)),
    setTodos: (todos) => dispatch(setTodosAction(todos)),
    addTodo: (payload) => dispatch(addTodoAction(payload)),
    editTodo: (id, payload) => dispatch(editTodoAction(id, payload)),
    removeTodo: (id) => dispatch(removeTodoAction(id))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);