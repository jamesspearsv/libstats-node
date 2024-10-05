import PropTypes from 'prop-types';
import styles from './SelectInput.module.css';

function SelectInput({ label, options, handleChange, formState }) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  };

  const id = title.toLowerCase();

  return <div style={style} className={styles.customSelect}></div>;
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  formState: PropTypes.string.isRequired,
};

export default SelectInput;
