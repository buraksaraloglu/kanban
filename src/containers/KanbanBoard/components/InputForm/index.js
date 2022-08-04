import React from 'react';

import { GrClose } from 'react-icons/gr';

const InputForm = ({
  type,
  text = '',
  onChange,
  closeForm,
  buttonTitle,
  placeholder,
  handleAddCard,
  handleAddList,
}) => {
  const handleClick = e => {
    e.preventDefault();
    type === 'list' ? handleAddList() : handleAddCard();
  };

  return (
    <form onSubmit={handleClick}>
      <input
        name="title"
        value={text}
        onChange={e => onChange(e)}
        placeholder={placeholder}
        onBlur={closeForm}
        autoFocus
      />
      <button type="submit">{buttonTitle}</button>
      <button className="close-button">
        <GrClose />
      </button>
    </form>
  );
};

export default InputForm;
