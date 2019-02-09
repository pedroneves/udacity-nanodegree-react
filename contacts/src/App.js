import React, { Component } from 'react';

class ContactList extends Component {
	render () {
		const { contacts = [] } = this.props;

		if (!contacts.length) {
			return (<ul>
				<li>No contacts right now :(</li>
			</ul>);
		}

		return (
			<ol>{
				contacts.map((contact, i) => {
					return (
						<li key={i}>{contact}</li>
					)
				})
			}</ol>
		)
	}
}

class App extends Component {
	render() {
		return (
			<div>
				<ContactList contacts={['Pedro', 'João', 'Maria']} />
				<ContactList contacts={['Pedro']} />
				<ContactList />
			</div>
		);
	}
}

export default App;
