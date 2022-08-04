import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Card } from '../Card';
import { Badge } from '../../../../components/Badge';
import ActionButton from '../ActionButton';
import styles from './styles.module.scss';

const ColumnHeader = ({ title, itemCount }) => (
  <div className={styles.columnHeader}>
    <h3>{title}</h3>
    <Badge>{itemCount}</Badge>
  </div>
);

const BoardColumn = props => {
  const { index, list } = props;

  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={[styles.columnContainer, snapshot.isDragging && styles.dragging].join(' ')}
        >
          <ColumnHeader title={list.title} itemCount={list.cards.length} />
          <hr className={styles.divider} />
          <Droppable droppableId={String(list.id)} type="card">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.listItems}
              >
                {list.cards.map((item, index) => (
                  <Card key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
                <ActionButton listId={list.id} type="card" />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default BoardColumn;
