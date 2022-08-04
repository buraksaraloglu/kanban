import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { sort } from '../../redux/actions';
import { BoardHeader } from '../../components/BoardHeader';
import { Column } from './components/Column';
import ActionButton from './components/ActionButton';
import styles from './styles.module.scss';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists);

  console.log('lists', lists);

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
      {/* <BoardHeader /> */}
      {/* <hr className={styles.divider} /> */}
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
                <ActionButton type="list" />
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
