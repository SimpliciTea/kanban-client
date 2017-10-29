import { combineReducers } from 'redux';

import boards from './boardReducer';
import auth from './authReducer';
import { reducer as formReducer } from 'redux-form';

/* ROOT REDUCER */
const rootReducer = combineReducers({
  boards,
  auth,
  form: formReducer
});

export default rootReducer;
