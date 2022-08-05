import React from 'react';

import styles from './styles.module.scss';

export const Badge = ({ children, color = 'primary', ...props }) => {
  const className = [styles.badge, color && styles[`badge-${color}`]].join(' ').trim();
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
};

Badge.defaultProps = {
  color: 'primary',
};
