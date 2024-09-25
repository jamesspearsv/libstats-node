import { useState } from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import toast from 'react-hot-toast';
import RecordFormStructure from '../assets/RecordFormStructure';
import SelectInput from '../components/SelectInput';
import Modal from '../components/Modal';

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
  const [isOpen, setIsOpen] = useState(false);

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

  function handleModalOpen(e) {
    setIsOpen(true);
  }

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <p>this is a dialog box</p>
      </Modal>
      <Form
        onSubmit={handleFormSubmit}
        title={'Add New Interaction'}
        style={{ margin: 'auto ', width: '35%' }}
      >
        {RecordFormStructure.map(({ title, values }, index) => {
          return (
            <SelectInput
              key={index}
              title={title}
              values={values}
              handleChange={handleChange}
              formState={formState[title.toLowerCase()]}
            />
          );
        })}
        <Button variant="primary" type="submit" text="Submit" />
      </Form>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <Button
          variant="primary"
          text="Need Help?"
          type="button"
          action={handleModalOpen}
        />
      </div>
    </>
  );
}

export default Record;
