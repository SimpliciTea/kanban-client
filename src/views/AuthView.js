import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';
import SignOut from '../components/auth/SignOut';

class AuthView extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path={'/'} component={SignUp} />
					<Route path={'/signin'} component={SignIn} />
					<Route path={'/signout'} component={SignOut}/>
				</Switch>
			</div>
		)
	}
}

export default withRouter(AuthView);