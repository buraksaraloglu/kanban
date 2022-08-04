import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { CARD_TYPES } from '../../constants/card';
import { CARD_ACTIONS, LIST_ACTIONS } from '../../constants/action-types';

const createRandomCard = () => {
  const randomCard = {
    id: uuid(),
    title: faker.lorem.sentence(),
    slug: `TEST-${faker.datatype.number(50)}`,
    priority: faker.datatype.number(2),
    type: faker.datatype.number(1) === 0 ? CARD_TYPES.BUG : CARD_TYPES.TASK,
    user: {
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
    },
  };
  return randomCard;
};

const generateRandomCards = numberOfCards => {
  const cards = [];
  for (let i = 0; i < numberOfCards; i++) {
    cards.push(createRandomCard());
  }
  return cards;
};

const initialState = [
  {
    title: 'To Do',
    id: uuid(),
    cards: generateRandomCards(Math.floor(Math.random() * 2) + 1),
  },
  {
    title: 'Done',
    id: uuid(),
    cards: generateRandomCards(Math.floor(Math.random() * 2) + 1),
  },
];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ACTIONS.ADD: {
      const newList = {
        title: action.payload.title,
        id: uuid(),
        cards: [],
      };
      return [...state, newList];
    }
    case LIST_ACTIONS.DRAG: {
      const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, type } =
        action.payload;

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
        id: uuid(),
        title: action.payload.title,
        slug: `TEST-${faker.datatype.number(50)}`,
        priority: faker.datatype.number(2),
        type: faker.datatype.number(1) === 0 ? CARD_TYPES.BUG : CARD_TYPES.TASK,
        user: {
          name: faker.name.findName(),
          avatar: faker.image.avatar(),
        },
      };

      const newState = [...state].map(list => {
        if (list.id !== action.payload.listId) return list;

        return {
          ...list,
          cards: [...list.cards, newCard],
        };
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
