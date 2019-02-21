import React from 'react';

function ContactCard (props) {
	const { contact } = props;
	return <li>{contact.name}</li>
}

export default ContactCard;