import {
  UPDATE_BOARD_TITLE,
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD_DESCRIPTION,
  ATTACH_CARD,
  DETACH_CARD,
  DROP_CARD_ON_FRAME,
  ADD_CHECKLIST,
  DELETE_CHECKLIST,
  UPDATE_CHECKLIST_TITLE,
  TOGGLE_CHECKLIST_ITEM,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM_TEXT,
  DELETE_CHECKLIST_ITEM
} from './types'; 


/* 
  This actions file is intended to contain all actions which
  pertain to a single kanban board -- thus all card and column
  actions as well, since those are always attached to a single
  board.

  May decompose if this file grows unruly.
*/


/*
  BOARD ACTIONS
  -- updateBoardTitle
*/

export function updateBoardTitle(boardId, value) {
  return {
    type: UPDATE_BOARD_TITLE,
    payload: {
      boardId,
      value
    }
  }
}


/* 
  COLUMN ACTIONS 
  -- attachCard
  -- detachCard
  -- dropCardOnFrame
*/

export function attachCard(boardId, colId, cardId, orderId = null) {
  // has an optional parameter of orderId for ordered drop operations
  return {
    type: ATTACH_CARD,
    payload: {
      boardId,
      colId,
      cardId,
      orderId
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

export function dropCardOnFrame(
  boardId,
  sourceColId, 
  sourceCardId, 
  targetColId, 
  orderId
) {
  // let's work with actions we've already created 
  return (dispatch) => {
    
    // detach card from source column
    dispatch(detachCard(boardId, sourceColId, sourceCardId));

    // then attach card to target column with orderId specified
    dispatch(attachCard(boardId, targetColId, sourceCardId, orderId));
  }
}



/* 
  CARD ACTIONS 
  -- createCard
  -- deleteCard
  -- updateCardDescription
*/


export function createCard(boardId, colId) {
  return (dispatch, getState) => {
    const cardIds = getState().boards.byId[boardId].cards.allIds;
    
    // calculate next available cardId
    // -- if cardIds is an emtpy array [], returns nextId of 1
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

export function updateCardDescription(boardId, cardId, value) {
  return {
    type: UPDATE_CARD_DESCRIPTION,
    payload: {
      boardId,
      cardId,
      value
    }
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

export function addChecklist(boardId, cardId) {
  return {
    type: ADD_CHECKLIST,
    payload: {
      boardId,
      cardId
    }
  }
}

export function deleteChecklist(boardId, cardId, checklistId) {
  return {
    type: DELETE_CHECKLIST,
    payload: {
      boardId,
      cardId,
      checklistId
    }
  }
}

export function updateChecklistTitle(boardId, cardId, checklistId, value) {
  return {
    type: UPDATE_CHECKLIST_TITLE,
    payload: {
      boardId,
      cardId,
      checklistId,
      value
    }
  }
}

export function toggleChecklistItem(boardId, cardId, checklistId, itemId) {
  return {
    type: TOGGLE_CHECKLIST_ITEM,
    payload: {
      boardId,
      cardId,
      checklistId,
      itemId
    }
  }
}

export function addChecklistItem(boardId, cardId, checklistId) {
  // in this case we will get the appropriate next ID in the reducer
  return {
    type: ADD_CHECKLIST_ITEM,
    payload: {
      boardId,
      cardId,
      checklistId
    }
  }
}

export function updateChecklistItemText(boardId, cardId, checklistId, itemId, text) {
  return {
    type: UPDATE_CHECKLIST_ITEM_TEXT,
    payload: {
      boardId,
      cardId,
      checklistId,
      itemId,
      text
    }
  }
}

export function deleteChecklistItem(boardId, cardId, checklistId, itemId) {
  return {
    type: DELETE_CHECKLIST_ITEM,
    payload: {
      boardId,
      cardId,
      checklistId,
      itemId
    }
  }
}








