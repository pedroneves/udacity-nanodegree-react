const logger = (store) => (next) => (action) => {
	console.group(action.type);

	console.log('Prev state:', store.getState())
	console.log('Action:', action);
	const result = next(action);
	console.log('New state:', store.getState())

	console.groupEnd(action.type);

	return result
}

export default logger;