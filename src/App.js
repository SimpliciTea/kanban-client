import React from 'react';
import { connect } from 'react-redux';
import { 
	Route,
	Redirect,
	withRouter
} from 'react-router-dom';

/* COMPONENTS */
import Header from './components/header/Header';

/* VIEWS */
import BoardView from './views/BoardView';
import AuthView from './views/AuthView';


class App extends React.Component {
	render() {
		console.log(process.env.NODE_ENV);

		return (
			<main>
				<Header authed={this.props.authenticated} />
				<Route path={'/'} component={AuthView} />
				<ProtectedRoute path={'/boards'} authed={this.props.authenticated} component={BoardView} />
			</main>
		)
	}
}

const ProtectedRoute = ({ component: Component, authed, ...rest }) => {
	return (
		<Route {...rest} render={props => authed === true
			? <Component {...props} />
			: <Redirect to={{pathname: '/', state: {from: props.location}}} />}
		/>
	)
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.authenticated
	}
}

export default withRouter(connect(mapStateToProps)(App));
