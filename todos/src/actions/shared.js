import API from 'goals-todos-api';

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData (todos, goals) {
	return { type: RECEIVE_DATA, goals, todos };
}

export function handleReceiveData (cb) {
	return dispatch => {
		Promise.all([
			API.fetchTodos(),
			API.fetchGoals()
		]).then(results => {
			const [todos, goals] = results;

			dispatch(
				receiveData(todos, goals)
			)

			cb(null, todos, goals);
		}).catch(() => {
			const error = new Error('Failed to load To-Dos and Goals from API');
			cb(error);
		});
	}
}