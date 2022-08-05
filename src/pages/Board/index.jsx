import React from 'react';

import ActionButton from '../../containers/ActionButton';
import KanbanBoard from '../../containers/KanbanBoard/board';

import styles from './styles.module.scss';

const Board = () => {
  return (
    <>
      <section className={styles.actionsContainer}>
        <ActionButton />
      </section>
      <KanbanBoard />
    </>
  );
};

export default Board;
