import React, {Component} from "react";
import {Button, Dialog, DialogTitle, Input} from "@material-ui/core";
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from "react-redux-notify";
import {
    createTodoAction,
    editTodoAction,
    removeTodoAction,
} from "../../store/actions/todos";
import {connect} from "react-redux";


class TodoModal extends Component {

    constructor(props) {
        super(props);
        const todo = props.todo;

        this.state = {
            id: todo ? todo.id : 0,
            title: todo ? todo.title : '',
            body: todo ? todo.body : ''
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.todo !== this.props.todo) {
            this.setState({...nextProps.todo});
        }
    }

    getHeader() {
        return this.props.newTodo ? 'Add' : 'Edit';
    }

    getButtonTitle() {
        return this.props.newTodo ? 'Create' : 'Save';
    }

    changeHandler = (target, field) => {
        this.setState({[field]: target.value});
    };

    createTodo = () => {
        this.props.createTodo(this.state);

        this.props.createNotification({
            message: 'Todos list loaded successfully',
            type: NOTIFICATION_TYPE_SUCCESS,
            duration: 1000
        });

        this.props.close();
    };

    editTodo = () => {
        this.props.editTodo(this.state.id, this.state);

        this.props.createNotification({
            message: 'Todos list updated successfully',
            type: NOTIFICATION_TYPE_SUCCESS,
            duration: 1000
        });

        this.props.close();
    };

    render() {
        return (
            <Dialog open={this.props.show}>
                <DialogTitle>{this.getHeader()}</DialogTitle>

                <form className="todo-form" >
                    <Input className="field" name="title" placeholder="Title" onChange={e => this.changeHandler(e.target, 'title')} value={this.state.title}/>
                    <Input className="field" name="body" placeholder="Description" onChange={e => this.changeHandler(e.target, 'body')} value={this.state.body}/>
                    <div className="footer">
                        <Button className="field" variant="contained" color="secondary" onClick={this.props.close}>Cancel</Button>
                        <Button className="field" variant="contained" color="primary"
                                onClick={this.props.newTodo ? this.createTodo : this.editTodo}>{this.getButtonTitle()}
                        </Button>
                    </div>
                </form>

            </Dialog>
        );
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
        createTodo: (todos) => dispatch(createTodoAction(todos)),
        editTodo: (id, payload) => dispatch(editTodoAction(id, payload)),
        removeTodo: (id) => dispatch(removeTodoAction(id))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoModal);