import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';

import { PriorityIcon } from '../../../../components/PriorityIcon';
import { CardTypeIcon } from '../../../../components/CardTypeIcon';

import styles from './styles.module.scss';

export const Card = props => {
  const { item, index } = props;

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classNames(styles.card, snapshot.isDragging && styles.dragging)}
        >
          <p className={styles.content}>{item.title}</p>
          <div className={styles.metaContainer}>
            <div className={styles.group}>
              <span className={styles.type}>
                <CardTypeIcon type={item.type} />
              </span>
              <span className={styles.slug}>{item.slug}</span>
            </div>
            <div className={styles.group}>
              <PriorityIcon priority={item.priority} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
