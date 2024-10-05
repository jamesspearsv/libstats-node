import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '../components/Button';
import Form from '../components/Form';
import toast from 'react-hot-toast';
import RecordFormStructure from '../assets/RecordFormStructure';
import SelectInput from '../components/SelectInput';
import Modal from '../components/Modal';

function Record() {
  const mounted = useRef(false);
  const today = new Date();
  const defaultFormState = {
    type: '',
    location: '',
    format: '',
    date: today.toLocaleDateString(),
  };

  // Component state
  const [apiurl, setApiurl] = useOutletContext();
  const [formState, setFormState] = useState(defaultFormState);
  const [formOptions, setFormOptions] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      const url = `${apiurl}/options`;
      console.log(url);
      const res = await fetch(url);
      console.log(res);
      const data = await res.json();
      console.log(data);
      setFormOptions(data);
      setLoading(false);
    }

    if (!mounted.current) {
      fetchOptions();
    }

    return () => {
      mounted.current = true;
      setLoading(true);
    };
  }, []);

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

  function handleSelectChange(e) {
    const id = e.currentTarget.id;
    const updatedState = { ...formState };
    updatedState[id] = e.currentTarget.value;
    setFormState(updatedState);
    console.log(updatedState);
  }

  function handleModalOpen(e) {
    setIsOpen(true);
  }
  const selects = (
    <>
      <SelectInput
        label='Type'
        options={formOptions.types}
        handleChange={handleSelectChange}
        formState={formState}
      />
      <SelectInput
        label='Location'
        options={formOptions.locations}
        handleChange={handleSelectChange}
        formState={formState}
      />
      <SelectInput
        label='Format'
        options={formOptions.formats}
        handleChange={handleSelectChange}
        formState={formState}
      />
    </>
  );

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <p>this is a dialog box</p>
      </Modal>
      <Form
        onSubmit={handleFormSubmit}
        title={'Add New Interaction'}
        style={{ margin: 'auto ', width: 'max(30%, 350px)' }}
      >
        {!loading && (
          <>
            <SelectInput
              label='Type'
              options={formOptions.types}
              handleChange={handleSelectChange}
              formState={formState}
            />
            <SelectInput
              label='Location'
              options={formOptions.locations}
              handleChange={handleSelectChange}
              formState={formState}
            />
            <SelectInput
              label='Format'
              options={formOptions.formats}
              handleChange={handleSelectChange}
              formState={formState}
            />
          </>
        )}
        <Button variant='primary' type='submit' text='Submit' />
      </Form>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <Button
          variant='primary'
          text='Need Help?'
          type='button'
          action={handleModalOpen}
        />
      </div>
      <p>{formState.type ? formState.type : 'null'}</p>
      <p>{formState.location ? formState.location : 'null'}</p>
      <p>{formState.format ? formState.format : 'null'}</p>
    </>
  );
}

export default Record;
