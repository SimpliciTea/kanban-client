import columnReducer from './columnReducer';
import cardReducer from './cardReducer';

export default function (state = {}, action) {
  switch(action.type) {

    /* ITEM ACTIONS */
    case 'ADD_ITEM':
      return {...state, cards: cardReducer(state.cards, action)};

    /* COLUMN ACTIONS */
    case 'EDIT_COLUMN':
      return {...state, columns: columnReducer(state.columns, action)};
    default: 
      return state;
  }
}
