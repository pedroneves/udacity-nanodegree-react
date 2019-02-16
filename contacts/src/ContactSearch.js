import React, { Component } from 'react'

class ContactSearch extends Component {
	constructor (props) {
		super(props)
		this.state = {
			query: ''
		}
	}

	updateQuery (query) {
		query = query.trim();
		this.setState(() => ({ query }));
		this.props.onUpdateQuery(query);
	}

	handleChange = (event) => {
		this.updateQuery(event.target.value)
	}

	render () {
		return (
			<div>
				<input
					type="text"
					placeholder="Click here to filter your contacts"
					value={this.state.query}
					onChange={this.handleChange}
				/>
			</div>
		)
	}
}

export default ContactSearch;