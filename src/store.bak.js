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
    lastFetched: '',
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
              description: 'card 0',
              checklists: {
                byId: {
                  0: {
                    id: 0,
                    title: 'checklistTitle 0',
                    items: {
                      byId: {
                        0: {
                          id: 0,
                          text: 'checklistItem 0 text',
                          isChecked: false
                        }
                      },
                      allIds: [0]
                    }
                  }
                },
                allIds: [0]
              }
            },
            1: {
              id: 1,
              description: 'card 1',
              checklists: {
                byId: {

                },
                allIds: []
              }
            },
            2: {
              id: 2,
              description: 'card 2',
              checklists: {
                byId: {

                },
                allIds: []
              }
            },
            3: {
              id: 3,
              description: 'card 3',
              checklists: {
                byId: {

                },
                allIds: []
              }
            },
            4: {
              id: 4,
              description: 'card 4',
              checklists: {
                byId: {

                },
                allIds: []
              }
            },
            5: {
              id: 5,
              description: 'card 5',
              checklists: {
                byId: {

                },
                allIds: []
              }
            }
          },
          allIds: [0,1,2,3,4,5]
        }
      }
    },
    allIds: [0]
  },
  auth: {
    authenticated: true,
    user: 'a@a.com'
  }  
}

const store = createStoreWithMiddleware(rootReducer, initialState);

export default store;
