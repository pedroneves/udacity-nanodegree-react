import React from 'react';

function ListItem (props) {
	const {value, isDone, onToggleItem, onRemoveItem} = props;

	const style = {
		textDecoration: isDone ? 'line-through' : 'none'
	};

	return (
		<li>
			<span onClick={onToggleItem} style={style}>{value}</span>
			<button onClick={onRemoveItem}>X</button>
		</li>
	);
}

export default ListItem;