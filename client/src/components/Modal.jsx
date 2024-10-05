import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import Button from './Button';

function Modal({ isOpen, setIsOpen, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    isOpen ? modalRef.current.showModal() : modalRef.current.close();
  }, [isOpen]);

  function handleModalClose() {
    setIsOpen(false);
  }

  return (
    <dialog className={styles.modal} ref={modalRef}>
      <div>
        <Button
          text='Close'
          type='button'
          variant='danger'
          action={handleModalClose}
        />
      </div>
      {children}
    </dialog>
  );
}

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   setIsOpen: PropTypes.func.isRequired,
//   chldren: PropTypes.node.isRequired,
// };

export default Modal;
