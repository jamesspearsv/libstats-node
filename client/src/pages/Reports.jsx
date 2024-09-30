import { useEffect, useState } from 'react';
import Form from '../components/Form';
import SelectInput from '../components/SelectInput';
import toast from 'react-hot-toast';
import Button from '../components/Button';

function Reports() {
  const defaultFormState = {
    start: '',
    end: '',
    location: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  function handleSelectChange(e) {
    const value = e.currentTarget.value;
    const updatedState = { ...formState };
    updatedState.location = value;
    setFormState(updatedState);
  }

  function handleDateChange(e) {
    const updatedState = { ...formState };
    if ('start' === e.currentTarget.id) {
      updatedState.start = e.currentTarget.value;
    } else if ('end' === e.currentTarget.id) {
      updatedState.end = e.currentTarget.value;
    } else {
      return;
    }
    setFormState(updatedState);
  }

  // Check that end date comes after start date when formState changes
  useEffect(() => {
    if (formState.end != '' && formState.start != '') {
      if (formState.end < formState.start) {
        toast.dismiss();
        toast.error('Start date cannot be after end date', {
          duration: '',
          position: 'top-center',
        });
      } else {
        toast.dismiss();
      }
    }

    return () => toast.dismiss();
  }, [formState]);

  return (
    <>
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
            <input
              type="date"
              name="start"
              id="start"
              value={formState.start}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <label htmlFor="end">End Date</label>
            <input
              type="date"
              name="end"
              id="end"
              value={formState.end}
              onChange={handleDateChange}
            />
          </div>
          <SelectInput
            title="Location"
            values={['Circulation', 'Reference', 'Childrens']}
            handleChange={handleSelectChange}
            formState={formState.location}
          />
        </div>
      </Form>
      <p>{formState.start ? formState.start : 'null'}</p>
      <p>{formState.end ? formState.end : 'null'}</p>
      <p>{formState.location ? formState.location : 'null'}</p>
    </>
  );
}

export default Reports;
