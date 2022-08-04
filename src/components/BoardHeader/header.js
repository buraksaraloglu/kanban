import React from 'react';

import styles from './styles.module.scss';

const BoardHeader = ({ board }) => (
  <div className={styles.headerContainer}>
    <h2>{board.name}</h2>
  </div>
);

export default BoardHeader;
