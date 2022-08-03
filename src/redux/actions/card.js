import { CARD_ACTIONS } from '../../constants/action-types';

export const addCard = (listId, text) => {
  return {
    type: CARD_ACTIONS.ADD,
    payload: { text, listId },
  };
};

export const editCard = (id, listId, newText) => {
  return {
    type: CARD_ACTIONS.EDIT,
    payload: { id, listId, newText },
  };
};

export const deleteCard = (id, listId) => {
  return {
    type: CARD_ACTIONS.DELETE,
    payload: { id, listId },
  };
};
