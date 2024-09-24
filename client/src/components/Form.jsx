import PropTypes from 'prop-types';
import styles from './Form.module.css';

function Form({ onSubmit, title, style, children }) {
  return (
    <form onSubmit={onSubmit} className={styles.form} style={style}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </form>
  );
}

Form.propType = {
  children: PropTypes.element.isRequired,
};

export default Form;
