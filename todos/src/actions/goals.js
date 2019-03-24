import API from 'goals-todos-api';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

function addGoal (goal) {
	return { type: ADD_GOAL, goal }
}

function removeGoal (id) {
	return { type: REMOVE_GOAL, id }
}

export function handleAddGoal (name, cb) {
	return (dispatch) => {
		API.saveGoal(name)
			.then((todo) => {
				dispatch(addGoal(todo));
				cb();
			}).catch(() => {
				const error = new Error('Failed to add new Goal');
				error.name = name;
				cb(error);
			})
	}
}

export function handleRemoveGoal (goal, cb) {
	return dispatch => {
		dispatch(removeGoal(goal.id));

		API.deleteGoal(goal.id)
			.then(() => cb())
			.catch(() => {
				dispatch(addGoal(goal));
				cb(new Error('An error occurred. Try again.'))
			})
	}
}