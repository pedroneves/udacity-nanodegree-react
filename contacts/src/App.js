import React, { Component } from 'react';
import ContactList from './ContactList';
import ContactSearch from './ContactSearch';

class App extends Component {
	state = {
		contacts: [
			{
				id: 'tyler',
				name: 'Tyler McGinnis',
				username: 'tylermcginnis'
			},
			{
				id: 'karen',
				name: 'Karen Isgrigg',
				username: 'karen_isgrigg'
			},
			{
				id: 'richard',
				name: 'Richard Kalehoff',
				username: 'richardkalehoff'
			},
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
