import React, { Component } from 'react';
import ContactList from './ContactList';
import ContactSearch from './ContactSearch';
import * as ContactAPI from './utils/ContactsAPI';
import { Route } from 'react-router-dom';

class App extends Component {

	constructor (props) {
		super(props)

		this.allContacts = []

		this.state = {
			query: '',
			status: 'loading',
			contacts: this.allContacts
		}
	}

	componentDidMount() {
		this.loadContacts();
	}

	loadContacts () {
		this.setState(() => ({ status: 'loading' }))

		ContactAPI.getAll().then(contacts => {
			this.allContacts = contacts;
			this.setState(() => ({
				contacts,
				status: 'ready'
			}))
		})
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

	removeContact = (contact) => {
		ContactAPI.remove(contact).then(data => {
			return this.loadContacts()
		});
	}

	render() {
		return (
			<Route
				exact
				path="/"
				render={() => {
					if (this.state.status === 'loading') {
						return (<p>Fetching contacts from server...</p>)
					}

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
							<ContactList contacts={this.state.contacts} onRemoveContact={this.removeContact} />
						</div>
					);
				}
			} />
		)
	}
}

export default App;
