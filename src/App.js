import React from 'react';
import { Route } from 'react-router-dom';

/* COMPONENTS */
import Header from './components/header/Header';

/* VIEWS */
import BoardView from './views/BoardView';
import AuthView from './views/AuthView';


class App extends React.Component {
	render() {
		return (
			<main>
				<Route path={'/'} component={Header} />
				<Route path={'/auth'} component={AuthView} />
				<Route path={'/boards'} component={BoardView} />
			</main>
		)
	}
}


export default App;
