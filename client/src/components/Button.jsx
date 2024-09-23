import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ text, action, style, type }) {
  return (
    <button
      onClick={action}
      className={`${styles.button} ${styles[style]}`}
      type={type}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
