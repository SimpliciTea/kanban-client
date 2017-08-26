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

const attachCard = (state, { colId, cardId }) => {
  // get the column and it's card ids,
  // then append the new id
  const col = state.byId[colId];
  const updatedCardIds = [...col.cardIds, cardId];

  return mergeUpdatedCardIds(state, colId, updatedCardIds);
}

const detachCard = (state, { colId, cardId }) => {
  // get the column by it's id
  const col = state.byId[colId];

  // filter out the card from col's carIds array
  const updatedCardIds = col.cardIds.filter(id => id !== cardId);

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
