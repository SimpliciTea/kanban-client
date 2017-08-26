import columnReducer from './columnReducer';
import cardReducer from './cardReducer';

import { 
  CREATE_CARD,
  DELETE_CARD,
  ATTACH_CARD,
  DETACH_CARD
} from '../actions/types';


export default function (state = {}, action) {
  switch(action.type) {
    case CREATE_CARD:
    case DELETE_CARD: {
      const { boardId } = action.payload; 
      const board = state.byId[boardId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [boardId]: {
            ...board,
            cards: cardReducer(board.cards, action)
          }
        }
      };
    }

    case ATTACH_CARD:
    case DETACH_CARD: {
      const { boardId } = action.payload;
      const board = state.byId[boardId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [boardId]: {
            ...board,
            columns: columnReducer(board.columns, action)
          }
        }
      }
    }

    default: 
      return state;
  }
}
