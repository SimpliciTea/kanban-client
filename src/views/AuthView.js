import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';
import SignOut from '../components/auth/SignOut';
import withViewWrapper from '../components/auth/ViewWrapper';

class AuthView extends React.Component {
	

	render() {
		return (
			<div>
				<Switch>
					<Route exact path={'/'} component={withViewWrapper(SignUp, 'Create an Account')} />
					<Route path={'/signin'} component={withViewWrapper(SignIn, 'Welcome Back!')} />
					<Route path={'/signout'} component={SignOut}/>
				</Switch>
			</div>
		)
	}
}

export default withRouter(AuthView);