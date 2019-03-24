import List from './List';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { handleAddToDo, handleToggleToDo, handleRemoveToDo } from '../actions/todos';

class Todos extends Component {

	handleAddItem = (event) => {
		event.preventDefault();
		const name = this.todoInput.value;

		this.todoInput.disabled = true;
		this.addTodoBtn.disabled = true;

		this.props.dispatch(
			handleAddToDo(name, (error) => {
				if (error) {
					alert(error.message)
				} else {
					this.todoInput.value = '';
				}
				this.todoInput.disabled = false
				this.addTodoBtn.disabled = false;
			})
		)
	}

	onCompleteTodo = (item) => {
		this.props.dispatch(
			handleToggleToDo(item, (error) => {
				if(error) { alert(error.message) }
			})
		)
	}

	onRemoveTodo = (item) => {
		this.props.dispatch(
			handleRemoveToDo(item, (error) => {
				if(error) { alert(error.message) }
			})
		)
	}

	render () {
		return (
			<div>
				<h1>To-do List</h1>
				<form onSubmit={this.handleAddItem}>
					<input
						type="text"
						placeholder="Add todo"
						ref={(input) => this.todoInput = input}
					/>
					<button
						onClick={this.handleAddItem}
						ref={(addTodoBtn => this.addTodoBtn = addTodoBtn)}
					>
						Add To-Do
					</button>
				</form>

				<List
					items={this.props.todos}
					onCompleteItem={this.onCompleteTodo}
					onRemoveItem={this.onRemoveTodo}
				/>
			</div>
		);
	}
}

const ConnectedTodos = connect((state) => ({
	todos: state.todos
}))(Todos)

export default ConnectedTodos;