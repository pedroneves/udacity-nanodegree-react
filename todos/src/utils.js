// Source: https://github.com/udacity/reactnd-redux-todos-goals/blob/707da3250f13adfef00fdbf032a563135cdf939a/index.html#L20
export function generateId () {
	return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}