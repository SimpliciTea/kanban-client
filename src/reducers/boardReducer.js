import columnReducer from './columnReducer';
import cardReducer from './cardReducer';

import { CREATE_CARD } from '../actions/types';

export default function (state = {}, action) {
  switch(action.type) {

    /* ITEM ACTIONS */
    case CREATE_CARD:
      console.log(CREATE_CARD);
      return {...state, cards: cardReducer(state.cards, action)};

    /* COLUMN ACTIONS */
    case 'EDIT_COLUMN':
      return {...state, columns: columnReducer(state.columns, action)};
    default: 
      return state;
  }
}
