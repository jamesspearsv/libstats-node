function SelectInput({ name, label, options, handleChange, formState }) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={style}>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={handleChange} value={formState}>
        <option value="" disabled>{`Select ${label}`}</option>
        {options.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
