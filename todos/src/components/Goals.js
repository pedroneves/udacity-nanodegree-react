import List from './List';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { handleAddGoal, handleRemoveGoal } from '../actions/goals';

class Goals extends Component {

	handleAddItem = (event) => {
		event.preventDefault()
		const name = this.goalInput.value;

		this.goalInput.disabled = true;
		this.addGoalBtn.disabled = true;

		this.props.dispatch(
			handleAddGoal(name, (error) => {
				if (error) {
					alert(error.message)
				} else {
					this.goalInput.value = '';
				}
				this.goalInput.disabled = false
				this.addGoalBtn.disabled = false;
			})
		)
	}

	onRemoveGoal = (item) => {
		this.props.dispatch(
			handleRemoveGoal(item, (error) => {
				if(error) { alert(error.message) }
			})
		)
	}

	render () {
		return (
			<div>
				<h1>Goals List</h1>

				<form onSubmit={this.handleAddItem}>
					<input
						type="text"
						placeholder="Add goal"
						ref={(input) => this.goalInput = input}
					/>
					<button
						onClick={this.handleAddItem}
						ref={(addGoalBtn => this.addGoalBtn = addGoalBtn)}
					>
						Add Goal
					</button>
				</form>

				<List items={this.props.goals} onRemoveItem={this.onRemoveGoal} />
			</div>
		);
	}
}

const ConnectedGoals = connect((state) => ({
	goals: state.goals
}))(Goals)

export default ConnectedGoals;