import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Modal from '../../components/Modal';
import { AddCardForm, AddListForm } from './components/Forms';
import { ADD_MODAL_ACTION_TYPES } from '../../constants/action-types';

import styles from './styles.module.scss';

const ActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState(ADD_MODAL_ACTION_TYPES.CARD);

  const handleClose = () => {
    setIsOpen(false);
    setActionType(ADD_MODAL_ACTION_TYPES.CARD);
  };

  return (
    <Modal
      headerActions={
        <div className={styles.actionTypeSelectContainer}>
          {Object.keys(ADD_MODAL_ACTION_TYPES).map(key => {
            const type = ADD_MODAL_ACTION_TYPES[key];
            return (
              <button
                key={type}
                onClick={() => setActionType(type)}
                className={classNames(
                  styles.actionButton,
                  actionType === type ? styles.active : '',
                )}
                disabled={actionType === type}
              >
                {type === ADD_MODAL_ACTION_TYPES.CARD ? 'New Card' : 'New List'}
              </button>
            );
          })}
        </div>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {actionType === ADD_MODAL_ACTION_TYPES.CARD ? (
        <AddCardForm handleClose={handleClose} />
      ) : (
        <AddListForm handleClose={handleClose} />
      )}
    </Modal>
  );
};

export default connect()(ActionButton);
