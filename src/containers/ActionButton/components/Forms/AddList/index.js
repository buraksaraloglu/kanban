import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { addList } from '../../../../../redux/actions';
import styles from '../styles.module.scss';

export const AddListForm = ({ handleClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(addList({ title: e.target.title.value }));
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        name="title"
        type="text"
        placeholder="Enter list title"
        className={styles.titleInput}
        required
      />

      <div className={styles.actionsContainer}>
        <button type="submit" className={classNames(styles.actionButton, styles.primary)}>
          Add List
        </button>
      </div>
    </form>
  );
};
