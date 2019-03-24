import { ADD_TODO } from '../actions/todos';
import { ADD_GOAL } from '../actions/goals';

const alertBitcoin = (store) => (next) => (action) => {
	const shouldVerify = [ADD_TODO, ADD_GOAL].includes(action.type);

	if (shouldVerify) {
		let name = action.todo ? action.todo.name : action.goal.name;

		if (name.toLowerCase().includes('bitcoin')){
			return alert('Check bitcoin.org first')
		}
	}

	next(action)
}

export default alertBitcoin;