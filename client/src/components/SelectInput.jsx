import PropTypes from 'prop-types';
import styles from './SelectInput.module.css';

function SelectInput({ title, name, values, handleChange, formState }) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  };

  const id = title.toLowerCase();

  return (
    <div style={style} className={styles.customSelect}>
      <label htmlFor={id}>{title}</label>
      <select name={id} id={id} onChange={handleChange} value={formState}>
        <option value='' disabled>{`Select ${title}`}</option>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  formState: PropTypes.string.isRequired,
};

export default SelectInput;
