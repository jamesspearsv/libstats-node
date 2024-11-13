import PropTypes from "prop-types";
import styles from "./Button.module.css";

/*
 * Custom button component
 * Variant corresponds to styles in Button.module.css
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
  type: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  action: PropTypes.func,
  style: PropTypes.object,
};

export default Button;
