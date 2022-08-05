import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';

import styles from './styles.module.scss';

const Modal = ({ modalTitle = null, headerActions, children, isOpen, setIsOpen }) => {
  return (
    <>
      <button className={styles.primaryActionButton} onClick={() => setIsOpen(true)}>
        <AiOutlinePlus />
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.centeredContainer}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                {modalTitle && <h5 className={styles.heading}>{modalTitle}</h5>}
                {headerActions}
                <button className={styles.closeModalButton} onClick={() => setIsOpen(false)}>
                  <RiCloseLine />
                </button>
              </div>
              <div className={styles.divider} />
              <div className={styles.modalContent}>{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
