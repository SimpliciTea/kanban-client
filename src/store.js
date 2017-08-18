import {
  compose,
  createStore
} from 'redux'
import rootReducer from './reducers/rootReducer';


const createStoreWithMiddleware = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


// columns and cards will not have unique id cross-board. Is this a bad idea? Hrm.
const initialState = {
  boards: {
    byId: {
      0: {
        id: 0,
        title: 'board 0',
        columns: {
          // not sure that columns should be byId/allId pattern? rolling with it for now, for consistency
          byId: {
            0: {
              id: 0,
              title: 'todo',
              cardIds: [0,1,2]
            },
            1: {
              id: 1,
              title: 'doing',
              cardIds: [3,4]
            },
            2: {
              id: 2,
              title: 'done',
              cardIds: [5]
            }
          },
          allIds: [0,1,2]
        },
        cards: {
          byId: {
            0: {
              id: 0,
              text: 'card 0'
            },
            1: {
              id: 1,
              text: 'card 1'
            },
            2: {
              id: 2,
              text: 'card 2'
            },
            3: {
              id: 3,
              text: 'card 3'
            },
            4: {
              id: 4,
              text: 'card 4'
            },
            5: {
              id: 5,
              text: 'card 5'
            }
          },
          allIds: [0,1,2,3,4,5]
        }
      }
    },
    allIds: [0]
  }  
}

const store = createStoreWithMiddleware(rootReducer, initialState);

export default store;
