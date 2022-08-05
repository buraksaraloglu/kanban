import React from 'react';

import { ItemPriority } from '../../constants/card';
import highPriorityIcon from '../../static/priority-icons/high.svg';
import mediumPriorityIcon from '../../static/priority-icons/medium.svg';
import lowPriorityIcon from '../../static/priority-icons/low.svg';

import styles from './styles.module.scss';

export const PriorityIcon = ({ priority }) => {
  const Icon = ({ src, alt }) => (
    <div dangerouslySetInnerHTML={{ __html: src }} className={styles.priorityIcon} alt={alt} />
  );

  switch (priority) {
    case ItemPriority.LOW:
      return <Icon src={lowPriorityIcon} alt="Low Priority" />;
    case ItemPriority.MEDIUM:
      return <Icon src={mediumPriorityIcon} alt="Medium priority" />;
    case ItemPriority.HIGH:
      return <Icon src={highPriorityIcon} alt="High priority" />;
    default:
      return <Icon src={mediumPriorityIcon} alt="Medium priority" />;
  }
};
