import { CARD_ACTIONS } from '../../constants/action-types';

export const addCard = ({ listId, title, type, priority }) => {
  return {
    type: CARD_ACTIONS.ADD,
    payload: { listId, title, type, priority },
  };
};
