import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  CARD_TYPES,
  CARD_TYPE_LABELS,
  ItemPriority,
  ItemPriorityLabels,
} from '../../../../../constants/card';
import { Select } from '../../../../../components/Select';
import { addCard } from '../../../../../redux/actions';
import styles from '../styles.module.scss';

const CardStatusSelect = () => {
  const lists = useSelector(state => state.lists);
  const listOptions = lists.map(list => ({
    key: list.id,
    label: list.title,
  }));

  return <Select name="listId" defaultValue={listOptions[0].key} options={listOptions} />;
};

const CardPrioritySelect = () => {
  const options = Object.keys(ItemPriority).map(key => ({
    key: ItemPriority[key],
    label: ItemPriorityLabels[ItemPriority[key]],
  }));

  return <Select name="priority" defaultValue={ItemPriority.MEDIUM} options={options} />;
};

const CardTypeSelect = () => {
  const options = Object.keys(CARD_TYPES).map(key => ({
    key: CARD_TYPES[key],
    label: CARD_TYPE_LABELS[CARD_TYPES[key]],
  }));

  return <Select name="type" defaultValue={CARD_TYPES.TASK} options={options} />;
};

export const AddCardForm = ({ handleClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const cardProps = {
      title: e.target.title.value,
      listId: e.target.listId.value,
      priority: parseInt(e.target.priority.value || ItemPriority.MEDIUM, 10),
      type: e.target.type.value,
    };

    dispatch(addCard(cardProps));
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        name="title"
        type="text"
        placeholder="Enter card title"
        className={styles.titleInput}
        required
      />

      <div className={styles.metaContainer}>
        <CardStatusSelect />
        <CardPrioritySelect />
        <CardTypeSelect />
      </div>

      <div className={styles.actionsContainer}>
        <button type="submit" className={classNames(styles.actionButton, styles.primary)}>
          Add card
        </button>
      </div>
    </form>
  );
};
