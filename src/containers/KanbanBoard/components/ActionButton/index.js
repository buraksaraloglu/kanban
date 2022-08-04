import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { addList, addCard } from '../../../../redux/actions';
import InputForm from '../InputForm';

const FORM_META_CONSTANTS = {
  list: {
    placeholder: 'Enter a column title',
    buttonText: 'Add List',
  },
  card: {
    placeholder: 'Enter your card title',
    buttonText: 'Add card',
  },
};

const ACTIONS_BY_TYPE = {
  list: addList,
  card: addCard,
};

const AddButton = ({ type, onClick }) => {
  const buttonText = type === 'list' ? 'Add List' : 'Add Card';
  return (
    <button
      onClick={onClick}
      className={type === 'list' ? 'list-text  p-3 ' : 'card-txt mt-1 px-2 py-2 pb-2 mx-2'}
    >
      {buttonText}
    </button>
  );
};

const Form = ({ type, listId, closeForm, dispatchAction }) => {
  const meta = FORM_META_CONSTANTS[type];
  if (!meta) {
    throw new Error('Invalid form type');
  }

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const handleInputChange = e => {
    setTitle(e.target.value);
  };

  const handleAddAction = () => {
    if (!title || !dispatchAction) return;

    const actionProps =
      type === 'card'
        ? {
            listId,
            title,
          }
        : {
            title,
          };

    dispatch(dispatchAction(actionProps));
    closeForm();
  };

  return (
    <div className="action-list">
      <InputForm
        type={type}
        text={title}
        onChange={handleInputChange}
        closeForm={closeForm}
        handleAddList={handleAddAction}
        handleAddCard={handleAddAction}
        placeholder={meta.placeholder}
        buttonTitle={meta.buttonText}
      />
    </div>
  );
};

const ActionButton = ({ type, listId = '' }) => {
  if (type === 'card' && !listId) {
    throw new Error('List ID is expected!');
  }

  const [formOpen, setFormOpen] = useState(false);

  return formOpen ? (
    <Form
      type={type}
      listId={listId}
      closeForm={() => setFormOpen(false)}
      dispatchAction={ACTIONS_BY_TYPE[type]}
    />
  ) : (
    <AddButton type={type} onClick={() => setFormOpen(true)} />
  );
};

export default connect()(ActionButton);
