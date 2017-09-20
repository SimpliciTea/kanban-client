import {
  ATTACH_CARD,
  DETACH_CARD
} from '../actions/types';


/* REDUCER SWITCH */

export default function (state = {}, action) {
  switch(action.type) {
    case ATTACH_CARD: 
      return attachCard(state, action.payload);
    case DETACH_CARD: 
      return detachCard(state, action.payload);
    default: 
      return state;
  }
}


/* PRIMARY FUNCTIONS */

const attachCard = (state, { colId, cardId, orderId }) => {
  const cardIds = state.byId[colId].cardIds;
  let updatedCardIds;

  // if orderId = null,
  // -- create new cardIds array with cardId appended to end
  // else if orderId is specified (non-null)
  // -- use orderId to slice our card into cardIds at index orderId
  if (orderId === null) {
    updatedCardIds = [ ...cardIds, cardId];
  } else {
    updatedCardIds = [ 
      ...cardIds.slice(0, orderId),
      cardId,
      ...cardIds.slice(orderId)
    ];
  }

  // merge new state
  return mergeUpdatedCardIds(state, colId, updatedCardIds);
}

const detachCard = (state, { colId, cardId }) => {
  // create new cardIds array with cardId filtered out
  const updatedCardIds = state.byId[colId].cardIds
    .filter(id => id !== cardId);

  // merge new state
  return mergeUpdatedCardIds(state, colId, updatedCardIds);
}



/* UTILITY FUNCTIONS */

const mergeUpdatedCardIds = (state, colId, updatedCardIds) => {
  return {
    ...state,
    byId: {
      ...state.byId,
      [colId]: {
        ...state.byId[colId],
        cardIds: updatedCardIds
      }
    }
  }; 
}
