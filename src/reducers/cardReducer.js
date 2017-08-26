import { 
  ADD_CARD 
} from '../actions/types';

const createCard = (id) => {
  return {
    id,
    description: '',
    isExpanded: false,
    checklists: {
      byId: {},
      allIds: []
    }
  }
}

export default function (state = {}, action) {
  switch(action.type) {
    case ADD_CARD: 
      const { nextId } = action.payload;

      return {
        allIds: [...state.allIds, nextId],
        byId: {
          ...state.byId,
          [nextId]: createCard(nextId)
        }
      };
    default:
      return state;
  }
}
