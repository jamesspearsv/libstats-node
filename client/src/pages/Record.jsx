import { useState } from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import toast from 'react-hot-toast';

function Record() {
  const today = new Date();
  const defaultFormState = {
    type: null,
    location: null,
    format: null,
    date: today.toLocaleDateString(),
  };

  // Component state
  const [formState, setFormState] = useState(defaultFormState);

  function handleFormSubmit(e) {
    e.preventDefault();
    for (const value in formState) {
      if (!formState[value]) {
        toast.error('Please complete the form', {
          position: 'top-center',
        });
        return;
      }
    }
    setFormState(defaultFormState);
    toast.success('Form submitted!');
  }

  function handleChange(e) {
    const id = e.currentTarget.id;
    const updatedState = { ...formState };
    updatedState[id] = e.currentTarget.value;
    setFormState(updatedState);
  }

  return 'record';
}

export default Record;
