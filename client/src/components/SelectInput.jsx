import PropTypes from "prop-types";
import styles from "./SelectInput.module.css";

/**
 * Custom select input with id, label, options, and a callback
 * @param {string} id
 * @param {string} label
 * @param {Array<{id: number, value: string}>}options
 * @param {(e: Event) => void} handleChange
 * @param {string} value
 * @returns {JSX.Element}
 * @constructor
 */

function SelectInput({ id, label, options, handleChange, value }) {
  const style = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={style} className={styles.customSelect}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select name={id} id={id} value={value} onChange={handleChange}>
        <option value="" disabled>{`Select ${label}`}</option>
        {options.map((option, index) => (
          <option value={option.id} key={index}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectInput;
