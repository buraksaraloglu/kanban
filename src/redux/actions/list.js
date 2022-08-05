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
