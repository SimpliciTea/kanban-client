import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';

class AuthView extends React.Component {
	render() {
		return (
			<Switch>
				<Route path={'/auth/signup'} component={SignUp} />
				<Route path={'/auth/signin'} component={SignIn} />
			</Switch>
		)
	}
}

export default AuthView;