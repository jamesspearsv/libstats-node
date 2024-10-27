import PropTypes from "prop-types";
import styles from "./Form.module.css";

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
  style: PropTypes.obj,
  children: PropTypes.node.isRequired,
};

export default Form;
