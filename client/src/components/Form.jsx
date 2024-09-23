import PropTypes from 'prop-types';
import styles from './Form.module.css';

function Form({ action, method, title, children }) {
  return (
    <form action={action} method={method} className={styles.form}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </form>
  );
}

// Form.propType = {
//   children: PropTypes.element.isRequired,
// };

export default Form;
