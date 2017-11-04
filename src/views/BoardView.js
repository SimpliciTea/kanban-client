import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/boardActions';

import Board from '../components/board/Board';
import Tabs from '../components/board/tabs/Tabs';
import Sidebar from '../components/board/sidebar/Sidebar';

class BoardView extends React.Component {

	componentDidMount() {
		if (this.props.boardId === null)
			this.props.fetchBoards(this.props.user);
	}

	render() {
		const { boardId } = this.props;

		return (
			<div className="board-view">
				<Tabs />				
				
				<div className="board-view__main">
					{boardId === null &&
						<p>Loading boards...</p>}

					{boardId !== null &&
						<Board id={boardId} />} 
					<Sidebar />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const boardId = state.boards.activeBoardId;

	return {
		boardId,
		authenticated: state.auth.authenticated,
		user: state.auth.user
	}
}

const mapDispatchToProps = {
	fetchBoards: actions.fetchBoards	
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardView);