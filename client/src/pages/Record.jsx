import { useState } from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import toast from 'react-hot-toast';
import RecordFormStructure from '../assets/RecordFormStructure';
import SelectInput from './SelectInput';

function Record() {
  const today = new Date();
  const defaultFormState = {
    type: '',
    location: '',
    format: '',
    date: today.toLocaleDateString(),
  };

  // Component state
  const [formState, setFormState] = useState(defaultFormState);

  function handleFormSubmit(e) {
    e.preventDefault();
    for (const value in formState) {
      if (!formState[value]) {
        toast.error('Please complete the form');
        return;
      }
    }
    console.log(formState);
    setFormState(defaultFormState);
    toast.success('Form submitted!');
  }

  function handleChange(e) {
    const id = e.currentTarget.id;
    const updatedState = { ...formState };
    updatedState[id] = e.currentTarget.value;
    setFormState(updatedState);
    console.log(updatedState);
  }

  return (
    <Form
      onSubmit={handleFormSubmit}
      title={'Add New Interaction'}
      style={{ margin: 'auto ' }}
    >
      {RecordFormStructure.map((select, index) => (
        <SelectInput
          key={index}
          name={select.name}
          label={select.label}
          options={select.options}
          handleChange={handleChange}
          formState={formState[select.name]}
        />
      ))}
      <Button style="primary" type="submit" text="Submit" />
    </Form>
  );
}

export default Record;
