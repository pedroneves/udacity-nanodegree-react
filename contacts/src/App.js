import React, { Component } from 'react';
import ContactList from './ContactList';

const list = [
	{ name: 'Pedro Neves', username: 'phfn' }
]

class App extends Component {
	render() {
		return (
			<div>
				<ContactList contacts={list} />
				<ContactList />
			</div>
		);
	}
}

export default App;
