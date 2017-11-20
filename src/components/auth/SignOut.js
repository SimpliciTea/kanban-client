import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/authActions';


class SignOut extends React.Component {

	componentWillMount() {
		this.props.signoutUser();
	}

	render() {
		return (
			<div>Bye now!</div>
		)
	}
}

const mapDispatchToProps = {
	signoutUser: actions.signoutUser
}

export default connect(null, mapDispatchToProps)(SignOut);