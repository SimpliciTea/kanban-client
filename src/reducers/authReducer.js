import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR
} from '../actions/types';


export default function(state = {}, action) {
	switch(action.type) {
		case AUTH_USER:
			return { 
				...state, 
				error: '', 
				authenticated: true,
				user: action.payload.user 
			};
		case UNAUTH_USER:
			return {
				...state,
				authenticated: false,
				user: ''
			};
		case AUTH_ERROR:
			return {
				...state,
				error: action.payload,
				authenticated: false,
				user: ''
			};
		default:
			return state;	
	}
}