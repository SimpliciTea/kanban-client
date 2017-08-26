import { 
  CREATE_CARD,
  DELETE_CARD,
  ATTACH_CARD,
  DETACH_CARD
} from './types'; 


/* 
  This actions file is intended to contain all actions which
  pertain to a single kanban board -- thus all card and column
  actions as well, since those are always attached to a single
  board.

  May decompose if this file grows unruly.
*/

/* 
  CARD ACTIONS 
  -- addCard
  -- deleteCard
  -- expandCard
  -- contractCard
  -- addChecklist
  -- deleteChecklist
  -- editDescription
  -- incrementColumn
  -- decrementColumn
*/


export function createCard(boardId, colId) {
  return (dispatch, getState) => {
    const cardIds = getState().boards.byId[boardId].cards.allIds;
    // if no ids, will return 1
    const nextId = Math.max(...cardIds) + 1;
    

    // add card to board's card list
    dispatch({
      type: CREATE_CARD,
      payload: {
        boardId,
        nextId
      }
    });

    // adding a card implies attachment to a column
    // -- attach card to the column which called the function
    dispatch(attachCard(boardId, colId, nextId));
  }
}

export function deleteCard(boardId, colId, cardId) {
  return (dispatch, getState) => {
    // first we detach the card from the column it belongs to
    dispatch(detachCard(boardId, colId, cardId));

    // and then we delete the card from the board's cards object
    dispatch({
      type: DELETE_CARD,
      payload: {
        boardId,
        cardId
      }
    });
  }
}

/* 
  CARD CHECKLIST ACTIONS 
  -- addChecklist
  -- deleteChecklist
  -- editChecklist
    -- addItem
    -- deleteItem
    -- editItem
  -- checkItem
  -- uncheckItem
*/


/* 
  COLUMN ACTIONS 
  -- attachCard
  -- detachCard
*/

export function attachCard(boardId, colId, cardId) {
  return {
    type: ATTACH_CARD,
    payload: {
      boardId,
      colId,
      cardId
    }
  }
}

export function detachCard(boardId, colId, cardId) {
  return {
    type: DETACH_CARD,
    payload: {
      boardId,
      colId,
      cardId
    }
  }
}


