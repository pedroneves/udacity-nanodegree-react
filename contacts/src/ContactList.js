import React from 'react';
import ContactCard from './ContactCard';

function ContactList (props) {
	const { contacts = [] } = props;

	if (!contacts.length) {
		return (
			<ul>
				<li>No contacts right now :(</li>
			</ul>
		);
	}

	return (
		<ol>{
			contacts.map(contact => (
				<ContactCard
					key={contact.id}
					contact={contact}
					onRemoveContact={props.onRemoveContact}
				/>
			))
		}</ol>
	);
}

export default ContactList;