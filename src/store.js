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

const getInitialAuthState = () => {
  const iat = localStorage.getItem('dateForToken');
  
  if (!iat || Date.now() - iat > 1000 * 60 * 60 * 24) {
    return {
      authenticated: false,
      error: '',
      user: ''
    }
  } else {
    return {
      authenticated: true,
      error: '',
      user: localStorage.getItem('emailForToken')
    }
  }
}

const initialBoardsState = {
  byId: {},
  allIds: [],
  isFetching: false,
  isPosting: false,
  fetchFailure: false,
  postFailure: false,
  lastFetched: 0,
  activeBoardId: null
}


// columns and cards will not have unique id cross-board. Is this a bad idea? Hrm.
const initialState = {
  boards: initialBoardsState,
  auth: getInitialAuthState()
}


const store = createStoreWithMiddleware(rootReducer, initialState);

export { initialBoardsState, store as default };
