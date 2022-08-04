import { LIST_ACTIONS } from '../../constants/action-types';

export const addList = ({ title }) => {
  return {
    type: LIST_ACTIONS.ADD,
    payload: { title },
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type,
) => {
  return {
    type: LIST_ACTIONS.DRAG,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  };
};

export const editTitle = (listId, newTitle) => {
  return {
    type: LIST_ACTIONS.EDIT_TITLE,
    payload: {
      listId,
      newTitle,
    },
  };
};

export const deleteList = listId => {
  return {
    type: LIST_ACTIONS.DELETE,
    payload: {
      listId,
    },
  };
};
