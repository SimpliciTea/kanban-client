import {
  ADD_CHECKLIST,
  DELETE_CHECKLIST,
  UPDATE_CHECKLIST_TITLE,
  TOGGLE_CHECKLIST_ITEM,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM_TEXT,
  DELETE_CHECKLIST_ITEM
} from '../actions/types';

// considering splitting checklistItem actions into another reducer

export default function (state = {}, action) {
  switch(action.type) {
    case ADD_CHECKLIST:
      return addChecklist(state);
    case DELETE_CHECKLIST:
      return deleteChecklist(state, action.payload);
    case UPDATE_CHECKLIST_TITLE:
      return updateChecklistTitle(state, action.payload);
    case TOGGLE_CHECKLIST_ITEM:
      return toggleChecklistItem(state, action.payload);
    case ADD_CHECKLIST_ITEM:
      return addChecklistItem(state, action.payload);
    case UPDATE_CHECKLIST_ITEM_TEXT:
      return updateChecklistItemText(state, action.payload);
    case DELETE_CHECKLIST_ITEM:
      return deleteChecklistItem(state, action.payload);
    default:
      return state;
  }
}


/* PRIMARY FUNCTIONS */
const addChecklist = (checklists) => {

  // get the next checklistId
  const nextId = checklists.allIds.length 
    ? Math.max(...checklists.allIds) + 1
    : 0;

  // build new checklist
  const nextChecklist = {
    id: nextId,
    title: '',
    items: {
      byId: {},
      allIds: []
    }
  }

  // return new object which includes 
  // -- nextChecklist in checklists.byId
  // -- nextId in checklists.allIds
  return {
    byId: {
      ...checklists.byId,
      [nextId]: nextChecklist
    },
    allIds: [...checklists.allIds, nextId]
  }
}

const deleteChecklist = (checklists, { checklistId }) => {

  // build nextById without checklist
  let nextById = { ...checklists.byId };
  delete nextById[checklistId];

  // return new object with nextById
  // and with checklists.allIds omitting checklistId
  return {
    byId: nextById,
    allIds: checklists.allIds.filter(id => id !== checklistId)
  }
}

const updateChecklistTitle = (checklists, { checklistId, value }) => {

  // get the checklist and update title prop
  let nextChecklist = { 
    ...checklists.byId[checklistId],
    title: value
  };

  // return new checklists object with nextChecklist
  return {
    ...checklists,
    byId: {
      ...checklists.byId,
      [checklistId]: nextChecklist
    }
  }
}


const toggleChecklistItem = (checklists, { checklistId, itemId }) => {
  
  // get the existing checklist
  let checklist = {
    ...checklists.byId[checklistId]
  }

  // get current isChecked
  const isCurrentlyChecked = checklist.items.byId[itemId].isChecked;

  // toggle isChecked in checklist obj
  checklist.items.byId[itemId].isChecked = !isCurrentlyChecked;

  // merge updated checklist into new Checklists object
  const updatedChecklists = {
    ...checklists,
    byId: {
      ...checklists.byId,
      [checklistId]: checklist
    }
  }

  // return updated state
  return updatedChecklists;
}


const addChecklistItem = (checklists, {checklistId}) => {

  // get the checklist and it's list of ids
  const checklist = checklists.byId[checklistId];
  const allItemIds = checklist.items.allIds;
  
  // if the list of items is empty, start at 0
  // otherwise increment from the highest ID in the list
  const nextItemId = allItemIds.length ? Math.max(...allItemIds) + 1 : 0;

  // build new template item object to push to store
  const nextItem = {
    id: nextItemId,
    text: '',
    isChecked: false
  }

  // build new list of allIds with with nextItemId appended
  const nextAllItemIds = [...allItemIds, nextItemId];

  // return updated state object
  return {
    ...checklists,
    byId: {
      ...checklists.byId,
      [checklistId]: {
        ...checklist,
        items: {
          byId: {
            ...checklist.items.byId,
            [nextItemId]: nextItem
          },
          allIds: nextAllItemIds          
        }
      }
    }
  }
}


const updateChecklistItemText = (checklists,  { checklistId, itemId, text }) => {
  // get checklist and get it's items
  const checklist = checklists.byId[checklistId];
  const items = checklist.items;

  // build updatedItems
  const updatedItems = {
    ...items,
    byId: {
      ...items.byId,
      [itemId]: {
        ...items.byId[itemId],
        text: text
      }
    }
  }

  // build updatedChecklist
  const updatedChecklist = {
    ...checklist,
    items: updatedItems
  }

  // push updated checklist to store
  return {
    ...checklists,
    byId: {
      ...checklists.byId,
      [checklistId]: updatedChecklist
    }
  }
}


const deleteChecklistItem = (checklists, { checklistId, itemId }) => {
  // get checklist and it's items
  const checklist = checklists.byId[checklistId];
  const items = checklist.items;

  // get updated byId without item
  let updatedById = { ...items.byId };
  delete updatedById[itemId];

  // build updatedItems
  const updatedItems = {
    byId: updatedById,
    allIds: items.allIds.filter(id => id !== itemId)
  }

  // push to state with updated items obj
  return {
    ...checklists,
    byId: {
      ...checklists.byId,
      [checklistId]: {
        ...checklists.byId[checklistId],
        items: updatedItems
      }
    }
  }
}
