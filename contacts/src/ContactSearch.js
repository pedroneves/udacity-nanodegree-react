import React, { Component } from 'react'

class ContactSearch extends Component {
	constructor (props) {
		super(props)
		this.state = {
			query: ''
		}
	}

	updateQuery (query) {
		console.log(query.trim())
		this.setState(() => ({ query }));
	}

	render () {
		return (
			<div>
				<input
					type="text"
					placeholder="Click here to filter your contacts"
					value={this.state.query}
					onChange={event => this.updateQuery(event.target.value)}
				/>
			</div>
		)
	}
}

export default ContactSearch;