import React, { Component } from 'react';
import ContactList from './ContactList';
import ContactSearch from './ContactSearch';

class App extends Component {
	state = {
		contacts: [
			{ name: 'John Doe', username: 'jde' }
		]
	}

	render() {
		return (
			<div>
				<ContactSearch />
				<ContactList contacts={this.state.contacts} />
			</div>
		);
	}
}

export default App;
