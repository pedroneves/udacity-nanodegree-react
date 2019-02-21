import React, { Component } from 'react';
import ContactList from './ContactList';
import ContactSearch from './ContactSearch';

class App extends Component {

	constructor (props) {
		super(props)

		this.allContacts = [
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

		this.state = {
			query: '',
			contacts: this.allContacts
		}
	}

	filterContacts = (query) => {
		this.setState(() => {
			const contacts = this.allContacts.filter(contact => {
				return contact.name.toLowerCase().includes(query.toLowerCase());
			});

			return { contacts, query };
		})
	}

	resetFilter = () => {
		this.setState(() => ({
			query: '',
			contacts: this.allContacts
		}))
	}

	render() {
		const contactsAmountMessage = (
			<div>
				<span>Showing {this.state.contacts.length} of {this.allContacts.length}</span>
				<button onClick={() => this.resetFilter()}>Show all</button>
			</div>
		)

		const isShowingContactsAmountMessage = this.state.contacts.length !== this.allContacts.length;

		return (
			<div>
				<ContactSearch onUpdateQuery={this.filterContacts} query={this.state.query} />
				{isShowingContactsAmountMessage ? contactsAmountMessage : <div></div>}
				<ContactList contacts={this.state.contacts} />
			</div>
		);
	}
}

export default App;
