import {
  compose,
  applyMiddleware,
  createStore
} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';


const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


// columns and cards will not have unique id cross-board. Is this a bad idea? Hrm.
const initialState = {
  boards: {
    lastFetched: null,
    activeBoardId: null,
    byId: {},
    allIds: []
  },
  auth: {
    authenticated: false,
    user: 'c@c.com'
  }  
}

const store = createStoreWithMiddleware(rootReducer, initialState);

export default store;
