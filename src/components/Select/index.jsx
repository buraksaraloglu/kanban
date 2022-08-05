import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

export const Select = ({
  name,
  options,
  label = '',
  defaultValue,
  className = '',
  placeholder = 'Select...',
}) => {
  if (!Array.isArray(options) || !options.length) {
    console.error('Select: options must be an array');
    return null;
  }

  return (
    <>
      <label className={classNames(styles.select, className)}>
        {label}
        <select name={name} defaultValue={defaultValue} placeholder={placeholder} required>
          {options.map(option => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
        <svg>
          <use xlinkHref="#select-arrow-down"></use>
        </svg>
      </label>
      <svg className={styles.sprites}>
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
    </>
  );
};
