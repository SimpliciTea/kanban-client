import axios from 'axios';
import config from '../config';

import {
  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  POST_BOARD,
  POST_BOARD_SUCCESS,
  POST_BOARD_FAILURE,
  UPDATE_BOARD_TITLE,
  SELECT_ACTIVE_BOARD,
  ATTACH_BOARD,
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
} from './types';

const ROOT_URL = process.env.NODE_ENV === 'production' 
  ? config.api.prod
  : config.api.dev;



/* 
  This actions file is intended to contain all actions which
  pertain to a single kanban board -- thus all card and column
  actions as well, since those are always attached to a single
  board.

  May decompose if this file grows unruly.
*/


/*
  BOARD ACTIONS
  -- fetchBoards
  -- updateBoardTitle
  -- selectActiveBoard
  -- addBoard
*/

export function fetchBoards(email) {
  return (dispatch) => {
    dispatch({ type: FETCH_BOARDS })
    const token = localStorage.getItem('token');

    axios.post(`${ROOT_URL}/boards/read`, {email, auth: token}).then(response => {
      let boards, allIds;

      // if the user has no boards when this request is made,
      // the backend creates an example board and returns that instead
      if (response.data.hasOwnProperty('ids')) {
        boards = response.data.boards;
        allIds = response.data.ids;
      } else {
        boards = [response.data];
        allIds = [response.data.id];
      }

      dispatch({
        type: FETCH_BOARDS_SUCCESS,
        payload: {
          boards,
          allIds
        }
      })
    }).catch(response => {
      console.log('failed to fetch boards: ', response)
    })
  }
}

export function postBoard(boardId) {
  return (dispatch, getState) => {
    dispatch({ type: POST_BOARD });
    const board = getState().boards.byId[boardId];
    const token = localStorage.getItem('token');

    dispatch({ type: POST_BOARD });

    axios.post(`${ROOT_URL}/boards/update`, { board, auth: token }).then(response => {
      console.log(response);

      // dispatch({type: POST_BOARD_SUCCESS});
    }).catch(response => {
      console.log(response);
      // if something goes wrong, notify the app
      dispatch({ type: POST_BOARD_FAILURE });

      // then fetch the users boards from server
      const user = getState().auth.user;
      fetchBoards(user);
    });
  }
}

export function createBoard(user) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    axios.post(`${ROOT_URL}/boards/create`, {email: user, auth: token}).then(response => {
      dispatch({
        type: ATTACH_BOARD,
        payload: {
          board: response.data
        }
      })
    }).catch(err => {
      console.log('Error creating new board: ', err);
    })
  }
}

export function updateBoardTitle(boardId, value) {
  return dispatch => {
    dispatch({
      type: UPDATE_BOARD_TITLE,
      payload: {
        boardId,
        value
      }
    });

    dispatch(postBoard(boardId));
  }
}

export function selectActiveBoard(boardId) {
  return {
    type: SELECT_ACTIVE_BOARD,
    payload: {
      boardId
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
  return dispatch => {
    dispatch({
      type: ATTACH_CARD,
      payload: {
        boardId,
        colId,
        cardId,
        orderId
      }
    });

    dispatch(postBoard(boardId));
  }
}

export function detachCard(boardId, colId, cardId) {
  return dispatch => {
    dispatch({
      type: DETACH_CARD,
      payload: {
        boardId,
        colId,
        cardId
      }
    });

    dispatch(postBoard(boardId));
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
  
    dispatch(postBoard(boardId));
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
    const nextId = (cardIds.length)
      ? Math.max(...cardIds) + 1
      : 0;

    console.log(nextId);

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
    // -- attachCard action with post board update
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

    dispatch(postBoard(boardId));
  }
}

export function updateCardDescription(boardId, cardId, value) {
  return dispatch => {
    dispatch({
      type: UPDATE_CARD_DESCRIPTION,
      payload: {
        boardId,
        cardId,
        value
      }
    });

    dispatch(postBoard(boardId));
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
  return dispatch => {
    dispatch({
      type: ADD_CHECKLIST,
      payload: {
        boardId,
        cardId
      }
    });

    dispatch(postBoard(boardId));
  }
}

export function deleteChecklist(boardId, cardId, checklistId) {
  return dispatch => {
    dispatch({
      type: DELETE_CHECKLIST,
      payload: {
        boardId,
        cardId,
        checklistId
      }
    });
  }
}

export function updateChecklistTitle(boardId, cardId, checklistId, value) {
  return dispatch => {
    dispatch({
      type: UPDATE_CHECKLIST_TITLE,
      payload: {
        boardId,
        cardId,
        checklistId,
        value
      }
    });

    dispatch(postBoard(boardId));
  }
}

export function toggleChecklistItem(boardId, cardId, checklistId, itemId) {
  return dispatch => {
    dispatch({
      type: TOGGLE_CHECKLIST_ITEM,
      payload: {
        boardId,
        cardId,
        checklistId,
        itemId
      }
    });

    dispatch(postBoard(boardId));
  }
}

export function addChecklistItem(boardId, cardId, checklistId) {
  // in this case we will get the appropriate next ID in the reducer
  return dispatch => {
    dispatch({
      type: ADD_CHECKLIST_ITEM,
      payload: {
        boardId,
        cardId,
        checklistId
      }
    });

    dispatch(postBoard(boardId));
  }
}

export function updateChecklistItemText(boardId, cardId, checklistId, itemId, text) {
  return dispatch => {
    dispatch({
      type: UPDATE_CHECKLIST_ITEM_TEXT,
      payload: {
        boardId,
        cardId,
        checklistId,
        itemId,
        text
      }
    });

    dispatch(postBoard(boardId));
  }
}

export function deleteChecklistItem(boardId, cardId, checklistId, itemId) {
  return dispatch => {
    dispatch({
      type: DELETE_CHECKLIST_ITEM,
      payload: {
        boardId,
        cardId,
        checklistId,
        itemId
      }
    });

    dispatch(postBoard(boardId));
  }
}








