import { combineReducers } from 'redux';

import boards from './boardReducer';


/* ROOT REDUCER */
const rootReducer = combineReducers({
  boards
});

export default rootReducer;
