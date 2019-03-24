import React from 'react';
import ListItem from './ListItem';

function List (props) {
	const {
		items,
		onCompleteItem = () => {},
		onRemoveItem = () => {}
	} = props;

	return (
		<ul>
		{
			items.map(item => (
				<ListItem
					key={item.id}
					value={item.name}
					isDone={item.isDone}
					onToggleItem={() => onCompleteItem(item)}
					onRemoveItem={() => onRemoveItem(item)}
				/>
			))
		}
		</ul>
	);
}

export default List