import PropTypes from "prop-types";
import styles from "./DateInput.module.css";

/* Custom date input with label and callback */

/**
 * Custom date input with label and callback
 * @param {string} id
 * @param {string} label
 * @param {'date' | 'month'} type
 * @param {string} value
 * @param {(e: Event) => void} handleChange
 * @returns {JSX.Element}
 */

function DateInput({ id, label, type, value, handleChange }) {
  return (
    <div className={styles.date}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={type === "month" ? "YYYY-MM" : undefined}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateInput;

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["date", "month"]).isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
