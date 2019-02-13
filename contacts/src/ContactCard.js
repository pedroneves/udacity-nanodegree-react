import React, { Component } from 'react';

class ContactCard extends Component {
	render () {
		const { contact } = this.props;
		return <li>{contact.name}</li>
	}
}

export default ContactCard;