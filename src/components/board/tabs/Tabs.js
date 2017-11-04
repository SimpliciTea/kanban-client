import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tab from './_tab.js';
import { Plus } from 'react-feather';

import { 
	selectActiveBoard,
	createBoard
} from '../../../actions/boardActions';


class Tabs extends React.Component {
	static propTypes = {
		boardMap: PropTypes.array.isRequired,
		activeBoardId: PropTypes.string,
		selectActiveBoard: PropTypes.func.isRequired
	}

	handleAddBoard() {
		this.props.createBoard(this.props.user);
	}

	handleSelectBoard(id) {
		this.props.selectActiveBoard(id);
	}

	render() {
		return (
			<nav className="board-nav">
				<ul>
					{this.props.boardMap.map(board => 
						<Tab title={board.title}
								 key={board.id}
								 isActive={board.id === this.props.activeBoardId}
								 boardId={board.id}
								 handleSelectBoard={this.handleSelectBoard.bind(this)} />
					)}

					<li className="board-control board-control--add-board"
							onClick={this.handleAddBoard.bind(this)}>
						<Plus size={20} />
					</li>
				</ul>
			</nav>
		)
	}
}


const mapStateToProps = state => {
	const boards = state.boards.byId;
	const boardMap = state.boards.allIds.map(id => {
		return { id, title: boards[id].title }
	});

	return {
		boardMap,
		activeBoardId: state.boards.activeBoardId,
		user: state.auth.user
	}
}

const mapDispatchToProps = {
	selectActiveBoard,
	createBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);