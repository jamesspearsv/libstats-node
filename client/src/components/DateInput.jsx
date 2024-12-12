import PropTypes from "prop-types";
import styles from "./DateInput.module.css";

/* Custom date input with label and callback */

// todo: begin here with jsdoc task

function DateInput({ label, value, handleChange }) {
  const id = label.toLowerCase();

  return (
    <div className={styles.date}>
      <label htmlFor={id} className={styles.label}>{`${label} Date`}</label>
      <input
        type="date"
        name={id}
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateInput;

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
