import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

function addToDo (todo) {
	return { type: ADD_TODO, todo }
}

function removeToDo (id) {
	return { type: REMOVE_TODO, id }
}

function toggleToDo (id) {
	return { type: TOGGLE_TODO, id }
}

export function handleAddToDo (name, cb) {
	return (dispatch) => {
		API.saveTodo(name)
			.then((todo) => {
				dispatch(addToDo(todo));
				cb();
			}).catch(() => {
				const error = new Error('Failed to add new To-Do');
				error.name = name;
				cb(error);
			})
	}
}

export function handleRemoveToDo (todo, cb) {
	return dispatch => {
		dispatch(removeToDo(todo.id));

		API.deleteTodo(todo.id)
			.then(() => cb())
			.catch(() => {
				dispatch(addToDo(todo));
				cb(new Error('An error occurred. Try again.'))
			})
	}
}

export function handleToggleToDo (todo, cb) {
	return (dispatch) => {
		dispatch(toggleToDo(todo.id));

		API.saveTodoToggle(todo.id)
			.then(() => cb())
			.catch(() => {
				dispatch(toggleToDo(todo.id))
				cb(new Error('An error occurred. Try again.'))
			})
	}
}