import axios from 'axios';
import config from '../config';


import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	CLEAR_BOARDS_STATE
} from './types';

const ROOT_URL = process.env.NODE_ENV === 'production' 
	? config.api.prod
	: config.api.dev;

const storeToken = (token, email) => {
	localStorage.setItem('token', token);
	localStorage.setItem('dateForToken', Date.now());
	localStorage.setItem('emailForToken', email);
}


export function signupUser({ email, password }) {
	return dispatch => {
		axios.post(`${ROOT_URL}/auth/signup`, { email, password }).then(response => {
			storeToken(response.data.token, email);

			dispatch({ 
				type: AUTH_USER, 
				payload: {
					user: email
				}
			});
		}).catch(err => {
			dispatch(authError(err.response.data.error));
		});
	}
}


export function signinUser({ email, password }) {
	return dispatch => {
		axios.post(`${ROOT_URL}/auth/signin`, { email, password }).then(response => {
			storeToken(response.data.token, email);

			dispatch({ 
				type: AUTH_USER, 
				payload: {
					user: email
				}
			});
		}).catch(response => {
			dispatch(authError('No match found for given credentials.'));
		});
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	localStorage.removeItem('emailForToken');
	localStorage.removeItem('dateForToken');

	return dispatch => {
		dispatch({ type: UNAUTH_USER });
		dispatch({ type: CLEAR_BOARDS_STATE });
	}
}

export function authError(err) {
	return {
		type: AUTH_ERROR,
		payload: err
	}
}