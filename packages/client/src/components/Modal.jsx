import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import Button from "./Button";

/**
 * Custom modal component
 * @param {boolean} isOpen
 * @param {(boolean) => void} setIsOpen
 * @param {React.ReactNode} children
 * @param {Object} [style]
 * @returns {JSX.Element}
 * @constructor
 */

function Modal({ isOpen, setIsOpen, children, style }) {
  const modalRef = useRef(null);

  useEffect(() => {
    isOpen ? modalRef.current.showModal() : modalRef.current.close();
  }, [isOpen]);

  function handleModalClose() {
    setIsOpen(false);
  }

  return (
    <dialog className={styles.modal} ref={modalRef} style={style}>
      <div>
        <Button
          text="Close"
          type="button"
          variant="danger"
          action={handleModalClose}
        />
      </div>
      {children}
    </dialog>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default Modal;
