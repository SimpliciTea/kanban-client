import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BoardIndex from '../components/board-index/BoardIndex';
import Board from '../components/board/Board';
import Sidebar from '../components/sidebar/Sidebar';

class BoardView extends React.Component {

	render() {
		return (
			<div className="board-view">
				<Switch>
					<Route exact path="/boards" component={BoardIndex} />
					<Route path="/boards/:id" render={(props) => {
						return <Board id={parseInt(props.match.params.id)} /> 
					}}/> 
				</Switch>
				<Sidebar />
			</div>
		)
	}
}


export default BoardView;