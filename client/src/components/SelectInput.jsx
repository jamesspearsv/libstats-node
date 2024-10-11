import PropTypes from 'prop-types';
import styles from './SelectInput.module.css';

function SelectInput({ label, options, handleChange, value }) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  };

  const id = label.toLowerCase();

  return (
    <div style={style} className={styles.customSelect}>
      <label htmlFor={id}>{label}</label>
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
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectInput;
