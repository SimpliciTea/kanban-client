import columnReducer from './columnReducer';
import cardReducer from './cardReducer';

import {
  UPDATE_BOARD_TITLE,
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD_DESCRIPTION,
  ATTACH_CARD,
  DETACH_CARD,
  ADD_CHECKLIST,
  DELETE_CHECKLIST,
  UPDATE_CHECKLIST_TITLE,
  TOGGLE_CHECKLIST_ITEM,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM_TEXT,
  DELETE_CHECKLIST_ITEM
} from '../actions/types';


export default function (state = {}, action) {
  switch(action.type) {
    case CREATE_CARD:
    case DELETE_CARD:
    case UPDATE_CARD_DESCRIPTION:
    case ADD_CHECKLIST:
    case DELETE_CHECKLIST:
    case UPDATE_CHECKLIST_TITLE:
    case TOGGLE_CHECKLIST_ITEM:
    case ADD_CHECKLIST_ITEM:
    case UPDATE_CHECKLIST_ITEM_TEXT:
    case DELETE_CHECKLIST_ITEM: {
      const { boardId } = action.payload; 
      const board = state.byId[boardId];

      // unfortunately verbose pattern to delegate slices to reducers.
      // can I improve this? [TODO]
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

    case UPDATE_BOARD_TITLE:
      return updateBoardTitle(state, action.payload);
    default: 
      return state;
  }
}


/* PRIMARY FUNCTIONS */

const updateBoardTitle = (boards, { boardId, value }) => {
  
  // get copy of the board and update the title prop
  const nextBoard = {
    ...boards.byId[boardId],
    title: value
  }

  // return new state object with updated board
  return {
    ...boards,
    byId: {
      ...boards.byId,
      [boardId]: nextBoard
    }
  };
}
