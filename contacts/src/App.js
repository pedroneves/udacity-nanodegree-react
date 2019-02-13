import React, { Component } from 'react';
import ContactList from './ContactList';

class App extends Component {
	state = {
		contacts: [
			{ name: 'John Doe', username: 'jde' }
		]
	}

	render() {
		return (
			<div>
				<ContactList contacts={this.state.contacts} />
				<ContactList />
			</div>
		);
	}
}

export default App;
