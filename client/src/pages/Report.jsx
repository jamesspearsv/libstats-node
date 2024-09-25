import { useState } from 'react';
import Form from '../components/Form';
import SelectInput from '../components/SelectInput';

function Report() {
  const defaultFormState = {
    start: 'mm/dd/yyyy',
    end: 'mm/dd/yyyy',
    location: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  function handleSelectChange(e) {
    const value = e.currentTarget.value;
    const updatedState = { ...formState };
    updatedState.location = value;
    setFormState(updatedState);
  }

  return (
    <Form
      title="Build Report"
      style={{
        gap: '1rem',
        width: 'fit-content',
        margin: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <div>
          <label htmlFor="start">Start Date</label>
          <input type="date" name="start" id="start" />
        </div>
        <div>
          <label htmlFor="end">End Date</label>
          <input type="date" name="end" id="start" />
        </div>
        <SelectInput
          title="Location"
          values={['Circulation', 'Reference', 'Childrens']}
          handleChange={handleSelectChange}
          formState={formState.location}
        />
      </div>
    </Form>
  );
}

export default Report;
