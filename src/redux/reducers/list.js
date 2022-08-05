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

    case CARD_ACTIONS.ADD: {
      const newCard = {
        id: uuid(),
        title: action.payload.title,
        slug: `TEST-${faker.datatype.number(50)}`,
        priority: action.payload.priority,
        type: action.payload.type,
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
    default:
      console.log('Invalid action type');
      return state;
  }
};

export default listReducer;
