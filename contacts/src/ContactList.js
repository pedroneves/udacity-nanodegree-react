import React, { Component } from 'react';
import ContactCard from './ContactCard';

class ContactList extends Component {
	render () {
		const { contacts = [] } = this.props;

		if (!contacts.length) {
			return (
				<ul>
					<li>No contacts right now :(</li>
				</ul>
			);
		}

		return (
			<ol>{
				contacts.map(contact => {
					return <ContactCard key={contact.username} contact={contact} />
				})
			}</ol>
		);
	}
}

export default ContactList;