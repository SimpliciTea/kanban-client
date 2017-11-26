import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/authActions';


const validate = values => {
	const errors = {};

	if (!values.password)
		errors.password = 'Required';

	if (!values.email)
		errors.email = 'Required';

	return errors;
}


const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning }
}) => (
	<div>
		<label>{label}</label>
		<div>
			<input {...input} placeholder={label} type={type} />
			{touched &&
				((error && <span>{error}</span>) ||
					(warning && <span>{warning}</span>))}
		</div>
	</div>
)


class SignIn extends React.Component {

	handleFormSubmit(formProps) {
		this.props.signinUser(formProps);
	}


	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className='alert alert-danger'>
					<strong>Oops!</strong> { this.props.errorMessage }
				</div>
			)
		}
	}


	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/boards' } };

		return (
			<div>
				{this.props.authenticated && <Redirect to={from} />}

				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

					<div className="form-group">
						<label>Email</label>
						<div>
							<Field
								name='email'
								component={renderField}
								type='email'
								placeholder='email'
							/>
						</div>
					</div>

					<div className="form-group">
						<label>Password</label>
						<div>
							<Field
								name='password'
								type='password'
								component={renderField}
								placeholder='Password'
							/>
						</div>
					</div>

					{this.renderAlert()}

					<div>
						<button type='submit' disabled={pristine || submitting}>
							Submit
						</button>
					</div>
				</form>

				<span>Need an account? <Link to='/'>Sign Up!</Link></span>
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		errorMessage: state.auth.error,
		authenticated: state.auth.authenticated
	};
}

const mapDispatchToProps = {
	signinUser: actions.signinUser
} 

export default reduxForm({
	form: 'signin',
	validate
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));