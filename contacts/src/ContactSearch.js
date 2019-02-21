import React, { Component } from 'react'

function ContactSearch (props) {
	return (
		<div>
			<input
				type="text"
				placeholder="Click here to filter your contacts"
				value={props.query}
				onChange={(event) => props.onUpdateQuery(event.target.value)}
			/>
		</div>
	)
}

export default ContactSearch;