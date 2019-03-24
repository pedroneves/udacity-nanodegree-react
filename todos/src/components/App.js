import { connect } from 'react-redux';
import React, { Component } from 'react';
import { handleReceiveData } from '../actions/shared';

import ConnectedGoals from './Goals';
import ConnectedTodos from './Todos';

class App extends Component {

	componentDidMount () {
		const { dispatch } = this.props;

		dispatch(
			handleReceiveData((error, todos, goals) => {
				if (error) {
					return alert(error.message)
				}
			})
		)
	}

	render() {
		const { loading } = this.props;

		if (loading) {
			return <h3>Loading...</h3>
		}

		return (
			<div>
				<ConnectedTodos />
				<ConnectedGoals />
			</div>
		);
	}
}

const ConnectedApp = connect((state) => ({
	loading: state.loading
}))(App)

export default ConnectedApp;
