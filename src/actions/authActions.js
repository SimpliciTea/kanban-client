import axios from 'axios';
import config from '../config';


import {
	AUTH_USER
} from './types';

const ROOT_URL = config.api.url;


export function signupUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/auth/signup`, { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER });
				console.log(response.data);
				localStorage.setItem('token', response.data.token);
			}).catch(err => {
				console.log(err);
			})
	}
}