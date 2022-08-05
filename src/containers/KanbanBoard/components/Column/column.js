import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';

import { Card } from '../Card';
import { Badge } from '../../../../components/Badge';
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
          className={classNames(styles.columnContainer, snapshot.isDragging && styles.dragging)}
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
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default BoardColumn;
