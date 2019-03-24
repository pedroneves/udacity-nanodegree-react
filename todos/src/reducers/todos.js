import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/todos';
import { RECEIVE_DATA } from '../actions/shared';

export default function todos (todos=[], action) {
	switch (action.type) {
		case ADD_TODO:
			return todos.concat([action.todo])
		case REMOVE_TODO:
			return todos.filter(todo => todo.id !== action.id)
		case TOGGLE_TODO:
			return todos.map(todo => {
				if (todo.id === action.id) {
					todo = Object.assign({}, todo, { isDone: !todo.isDone })
				}

				return todo
			})
		case RECEIVE_DATA:
			return action.todos.map(todo => ({
					id: todo.id,
					name: todo.name,
					isDone: todo.complete
				})
			);
		default:
			return todos
	}
}