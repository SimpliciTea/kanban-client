import { 
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD_DESCRIPTION,
  ADD_CHECKLIST,
  DELETE_CHECKLIST,
  UPDATE_CHECKLIST_TITLE,
  TOGGLE_CHECKLIST_ITEM,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM_TEXT,
  DELETE_CHECKLIST_ITEM
} from '../actions/types';


import checklistReducer from './checklistReducer';


/* REDUCER SWITCH */

export default function (state = {}, action) {
  switch(action.type) {
    case ADD_CHECKLIST:
    case DELETE_CHECKLIST:
    case UPDATE_CHECKLIST_TITLE:
    case TOGGLE_CHECKLIST_ITEM:
    case ADD_CHECKLIST_ITEM:
    case UPDATE_CHECKLIST_ITEM_TEXT: 
    case DELETE_CHECKLIST_ITEM: {
      const { cardId } = action.payload;
      const card = state.byId[cardId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [cardId]: {
            ...card,
            checklists: checklistReducer(card.checklists, action)
          }
        }
      }
    }
    case CREATE_CARD:
      return createCard(state, action.payload);
    case DELETE_CARD: 
      return deleteCard(state, action.payload);
    case UPDATE_CARD_DESCRIPTION:
      return updateCardDescription(state, action.payload);
    default:
      return state;
  }
}


/* PRIMARY FUNCTIONS */

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
  // create byId object with card omitted,
  // then return with filtered allIds list
  let nextById = { ...cards.byId };
  delete nextById[cardId];

  return {
    byId: nextById,
    allIds: cards.allIds.filter(id => id !== cardId) 
  };
}


const updateCardDescription = (cards, { cardId, value }) => {

  // get copy of the card and update description prop
  let nextCard = {
    ...cards.byId[cardId],
    description: value
  }

  // dispatch new state with updated card description
  return {
    ...cards,
    byId: {
      ...cards.byId,
      [cardId]: nextCard
    }
  }
}


