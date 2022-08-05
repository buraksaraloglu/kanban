import React from 'react';
import classNames from 'classnames';
import { BiCube, BiTask } from 'react-icons/bi';

import { CARD_TYPES } from '../../constants/card';
import styles from './styles.module.scss';

export const CardTypeIcon = ({ type }) => {
  switch (type) {
    case CARD_TYPES.BUG:
      return (
        <div className={classNames(styles.itemType, styles.bug)}>
          <BiCube />
        </div>
      );
    case CARD_TYPES.TASK:
      return (
        <div className={classNames(styles.itemType, styles.task)}>
          <BiTask />
        </div>
      );
    default:
      return null;
  }
};
