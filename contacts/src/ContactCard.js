import React from 'react';

function ContactCard (props) {
	const { contact } = props;
	return (<li style={{marginTop: '20px'}}>
		<span>
			<div
				style={{
					display: 'inline-block',
					width: '50px',
					height: '50px',
					borderRadius: '1000px',
					backgroundSize: 'cover',
					backgroundImage: `url(${contact.avatarURL})`,
				}}
			></div>
		</span>
		{contact.name}
		<button onClick={() => {props.onRemoveContact(props.contact)}}>Remove</button>
	</li>)
}

export default ContactCard;