import React, {Component} from 'react';
import { Button, Dialog, DialogTitle, Input } from '@material-ui/core';
import { createNotification, NOTIFICATION_TYPE_SUCCESS } from 'react-redux-notify';
import {connect} from "react-redux";
import {addTodoAction} from "../../store/actions/todos";


class TodoModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todoForm: {
        title: '',
        body: ''
      },
    }
  }

  onTodoFormChange = ({target}) => {
    let todoForm = this.state.todoForm;

    todoForm[target.name] = target.value;

    this.setState({ todoForm });
  };

  saveTodo = () => {
    let payload = this.state.todoForm;

    let todos = JSON.parse(localStorage.getItem('todos'));

    if (payload.id) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === payload.id) {
          todos[i] = payload;
          break;
        }
      }
    } else {
      todos.unshift({
        ...payload,
        id: todos.length + 1
      });
    }

    localStorage.setItem('todos', JSON.stringify(todos));

    this.props.getTodoList();
    this.props.close();
    this.props.createNotification({
      message: `Todo ${payload.id ? 'saved' : 'added'}`,
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 1000
    });
  }

  getForm = (newTodo = false) => {
    const title = !newTodo && this.props.todo ? this.props.todo.title : '';
    const body = !newTodo && this.props.todo ? this.props.todo.body : '';


    return (
      <Dialog open={this.props.show}>
        <DialogTitle>Edit</DialogTitle>
          <form className="todo-form" onChange={this.onTodoFormChange}>
            <Input className="field" name="title" placeholder="Title" value={title} />
            <Input className="field" name="body" placeholder="Description" value={body} />
            <div className="footer">
              <Button className="field" variant="contained" color="secondary" onClick={this.props.close}>Cancel</Button>
              <Button className="field" variant="contained" color="primary" onClick={this.saveTodo}>Save</Button>
            </div>
          </form>
      </Dialog>
    )
  };

  render () {

    return this.props.new ? this.getForm(true) : this.getForm();
  }
}


const mapDispatchToProps = function (dispatch) {
  return {
    createNotification: (config) => dispatch(createNotification(config)),
    addTodo: (payload) => dispatch(addTodoAction(payload)),
  }
};

export default connect(
  mapDispatchToProps
)(TodoModal);