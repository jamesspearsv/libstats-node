import PropTypes from "prop-types";
import styles from "./Button.module.css";

/*
 * Custom button component
 * Variant corresponds to styles in Button.module.css
 */

function Button({ text, action, variant, type, style, id }) {
  return (
    <button
      id={id}
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
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  action: PropTypes.func,
  style: PropTypes.object,
  id: PropTypes.string,
};

export default Button;
