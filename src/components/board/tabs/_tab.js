import React from 'react';
import PropTypes from 'prop-types';

const Tab = (props) => {
	const {
		handleSelectBoard,
		title,
		boardId,
		isActive 
	} = props;

	const onSelectBoard = () => {
		handleSelectBoard(boardId)
	}

	return (
		<li className={isActive ? 'active' : ''}
				onClick={onSelectBoard}>
			{title || 'untitled'}
		</li>
	)
}

Tab.propTypes = {
	handleSelectBoard: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	boardId: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired
}


export default Tab;