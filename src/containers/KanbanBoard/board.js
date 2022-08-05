import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { sort } from '../../redux/actions';
import { Column } from './components/Column';

import styles from './styles.module.scss';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type,
      ),
    );
  };

  return (
    <div className={styles.container}>
      {lists?.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.columnsWrapper}
              >
                {lists.map((list, index) => (
                  <Column index={index} key={list.id} list={list} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div>No column found...</div>
      )}
    </div>
  );
};

export default connect()(KanbanBoard);
