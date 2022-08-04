import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BiCube, BiTask } from 'react-icons/bi';

import { PriorityIcon } from '../../../../components/PriorityIcon';
import { CARD_TYPES } from '../../../../constants/card';
import styles from './styles.module.scss';

const ItemTypeIcon = ({ type }) => {
  switch (type) {
    case CARD_TYPES.BUG:
      return (
        <div className={[styles.itemType, styles.bug].join(' ')}>
          <BiCube />
        </div>
      );
    case CARD_TYPES.TASK:
      return (
        <div className={[styles.itemType, styles.task].join(' ')}>
          <BiTask />
        </div>
      );
    default:
      return null;
  }
};

export const Card = props => {
  const { item, index } = props;

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.card}
        >
          <p className={styles.content}>{item.title}</p>
          <div className={styles.metaContainer}>
            <div className={styles.group}>
              <span className={styles.type}>
                <ItemTypeIcon type={item.type} />
              </span>
              <span className={styles.slug}>{item.slug}</span>
            </div>
            <div className={styles.group}>{/* <PriorityIcon priority={item.priority} /> */}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
