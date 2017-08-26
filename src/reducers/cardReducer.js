import { 
  CREATE_CARD,
  DELETE_CARD
} from '../actions/types';

const createCard = (cards, { nextId }) => {
  
  // create the new template card
  const newCard = {
    id: nextId,
    description: '',
    isExpanded: false,
    checklists: {
      byId: {},
      allIds: []
    }
  }

  // return obj with card attached to byId
  // and cardId appended to allIds
  return {
    byId: { ...cards.byId, [nextId]: newCard },
    allIds: [ ...cards.allIds, nextId ]
  }
}

const deleteCard = (cards, { cardId }) => {
  // filter out the cardId from the id's list
  const nextAllIds = cards.allIds.filter(id => id !== cardId);

  // delete card from byId obj
  const nextById = Object.assign({}, cards.byId);
  delete nextById[cardId];

  return {
    byId: nextById,
    allIds: nextAllIds
  };
}

export default function (state = {}, action) {
  switch(action.type) {
    case CREATE_CARD:
      return createCard(state, action.payload);
    case DELETE_CARD: 
      return deleteCard(state, action.payload)
    default:
      return state;
  }
}

