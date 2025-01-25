import PropTypes from "prop-types";
import styles from "./Form.module.css";

/**
 * Custom form component used to render and display form elements
 * @param {(e: Event) => void} [onSubmit] - callback function to run when form is submitted
 * @param {string} [title] - optional form title
 * @param {Object} [style] - optional React inline styles
 * @param {React.ReactNode} children
 * @returns {JSX.Element}
 * @constructor
 */

function Form({ onSubmit, title, style, children }) {
  return (
    <form onSubmit={onSubmit} className={styles.form} style={style}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default Form;
