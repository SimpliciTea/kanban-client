import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/authActions'


const validate = values => {
	const errors = {};

	if (values.password !== values.passwordConfirm) 
		errors.passwordConfirm = 'Passwords must match';
	
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


class SignUp extends React.Component {
	state = {
		redirectToReferrer: this.props.authenticated
	}


	handleFormSubmit(formProps) {
		this.props.signupUser(formProps);
	}
	

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className='alert alert-danger'>
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
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
								placeholder='Email'
							/>
						</div>
					</div>

					<div className="form-group">
						<label>Password</label>
						<div>
							<Field
								name='password'
								component={renderField}
								type='password'
								placeholder='Password'
							/>
						</div>
					</div>

					<div className="form-group">
						<label>Confirm Password</label>
						<div>
							<Field
								name='passwordConfirm'
								component={renderField}
								type='password'
								placeholder='Confirm Password'
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

				<span>Already have an account? <Link to='/signin'>Sign In!</Link></span>
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
	signupUser: actions.signupUser
}

export default reduxForm({
	form: 'signup',
	validate
})(connect(mapStateToProps, mapDispatchToProps)(SignUp));