import { combineReducers } from 'redux';

import boards from './boardReducer';
import auth from './authReducer';
import { reducer as formReducer } from 'redux-form';

import { baseState } from '../store';


/* ROOT REDUCER */
const rootReducer = combineReducers({
  boards,
  auth,
  form: formReducer
});

// const rootReducer = (state, action) => {
// 	// auth state is cleared by UNAUTH_USER before LOG_OUT is fired

// 	if (action.type = 'LOG_OUT') {
// 		state = {
// 			auth: state.auth,
// 			baseState
// 		};
// 	}

// 	return appReducer(state, action);
// }

export default rootReducer;
