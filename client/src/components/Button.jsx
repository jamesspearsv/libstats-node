import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ text, action, variant, type, style }) {
  return (
    <button
      onClick={action}
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      style={style}
    >
      {text}
    </button>
  );
}

// Button.propTypes = {
//   text: PropTypes.string.isRequired,
//   action: PropTypes.func,
//   style: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   styles: PropTypes.object,
// };

export default Button;
