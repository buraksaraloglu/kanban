import uuid from 'react-uuid';
import { CARD_ACTIONS, LIST_ACTIONS } from '../../constants/action-types';

const InitialState = [
  {
    title: 'To-do',
    id: uuid(),
    cards: [
      {
        id: uuid(),
        text: 'Bring milk and fruits from grocery store',
      },
      {
        id: uuid(),
        text: 'Review final year project thesis',
      },
      {
        id: uuid(),
        text: 'Push all codes from latest project to Git and write a Read-me for it',
      },
    ],
  },
];

const listReducer = (state = InitialState, action) => {
  const newList = {
    title: action.payload,
    id: uuid(),
    cards: [],
  };

  switch (action.type) {
    case LIST_ACTIONS.ADD_LIST:
      return [...state, newList];

    case LIST_ACTIONS.DRAG: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type,
      } = action.payload;

      const newDragState = [...state];
      if (type === 'list') {
        const list = newDragState.splice(droppableIndexStart, 1);
        newDragState.splice(droppableIndexEnd, 0, ...list);
        return newDragState;
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find(list => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find(list => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newDragState;
    }
    case LIST_ACTIONS.EDIT_TITLE: {
      const { listId, newTitle } = action.payload;
      let elementPos = state
        .map(function (x) {
          return x.id;
        })
        .indexOf(listId);
      const list = state[elementPos];
      list.title = newTitle;
      const newListState = state.map(i => i);
      return newListState;
    }
    case LIST_ACTIONS.DELETE: {
      const { listId } = action.payload;
      const newDelState = JSON.parse(JSON.stringify(state));
      let elementPos = state
        .map(function (x) {
          return x.id;
        })
        .indexOf(listId);
      newDelState.splice(elementPos, 1);
      return newDelState;
    }
    case CARD_ACTIONS.ADD: {
      const newCard = {
        text: action.payload.text,
        id: uuid(),
      };
      const newState = JSON.parse(JSON.stringify(state)).map(i => {
        if (i.id === action.payload.listId) {
          return {
            ...i,
            cards: [...i.cards, newCard],
          };
        } else {
          return i;
        }
      });
      return newState;
    }
    case CARD_ACTIONS.EDIT: {
      const { id, newText, listId } = action.payload;
      const newCardState = JSON.parse(JSON.stringify(state));
      let elementPos = newCardState
        .map(function (x) {
          return x.id;
        })
        .indexOf(listId);
      let cardPos = newCardState[elementPos].cards
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      const card = newCardState[elementPos].cards[cardPos];
      card.text = newText;
      return newCardState;
    }
    case CARD_ACTIONS.DELETE: {
      const { listId, id } = action.payload;
      const newCardDelState = JSON.parse(JSON.stringify(state));
      let elementPos = newCardDelState
        .map(function (x) {
          return x.id;
        })
        .indexOf(listId);
      let cardPos = newCardDelState[elementPos].cards
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      newCardDelState[elementPos].cards.splice(cardPos, 1);

      return newCardDelState;
    }
    default:
      return state;
  }
};

export default listReducer;
