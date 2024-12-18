import PropTypes from "prop-types";
import styles from "./Button.module.css";

/**
 * Custom button component
 * @param {string} [id] - prop to set `data-id` property of button
 * @param {string} text - button text property
 * @param {(e: Event) => void} [action] - button click callback function
 * @param {'primary' | 'danger'} variant - styled button variant
 * @param {'button' | 'submit'} type
 * @param {Object} [style] - Optional React style object
 * @returns {JSX.Element}
 */

function Button({ id, text, action, variant, type, style }) {
  return (
    <button
      data-id={id}
      onClick={action}
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      style={style}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  variant: PropTypes.oneOf(["primary", "danger"]).isRequired,
  action: PropTypes.func,
  style: PropTypes.object,
};

export default Button;
