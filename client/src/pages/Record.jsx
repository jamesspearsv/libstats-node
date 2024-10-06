import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Form from '../components/Form';
import SelectInput from '../components/SelectInput';
import Modal from '../components/Modal';
import Error from '../components/Error';

const defaultFormState = {
  type: '',
  location: '',
  format: '',
};

function Record() {
  // Component state
  // eslint-disable-next-line no-unused-vars
  const [apiurl, setApiurl] = useOutletContext();
  const [formState, setFormState] = useState(defaultFormState);
  const [formOptions, setFormOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Effect to fetch interaction options for form
  useEffect(() => {
    async function fetchOptions() {
      const url = `${apiurl}/options`;
      try {
        const res = await fetch(url);
        const json = await res.json();

        // check that res is okay or throw error
        if (!res.ok) throw json.error;

        console.log('message: ', json.message);
        setFormOptions(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    fetchOptions();

    return () => {
      setLoading(true);
      setError(false);
    };
  }, [apiurl]);

  // HANDLE FORM SUBMISSION
  function handleFormSubmit(e) {
    e.preventDefault();
    // return early if any form selects are invalid
    for (const value in formState) {
      if (!formState[value]) {
        toast.error('Please complete the form');
        return;
      }
    }

    // handle post with fetch api
    async function postInteraction() {
      // prepare for fetch call
      const currentToast = toast.loading('Adding interaction...');
      const url = `${apiurl}/add`;
      const options = {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const res = await fetch(url, options);
        const json = await res.json();

        // check that res is okay or throw error
        if (!res.ok) throw json.error;

        console.log('message: ', json.message);
        toast.success('Success!', { id: currentToast });
      } catch (error) {
        console.error(error);
        toast.error(error, { id: currentToast });
      }
    }
    postInteraction();

    setFormState(defaultFormState);
  }

  // Handle select element change and update state
  function handleSelectChange(e) {
    const id = e.currentTarget.id;
    const updatedState = { ...formState };
    updatedState[id] = e.currentTarget.value;
    setFormState(updatedState);
  }

  // Open Modal
  function handleModalOpen() {
    setIsOpen(true);
  }

  // // Render component based on loading and error state
  if (error) return <Error />;
  if (loading) return;

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
        <Button variant='primary' type='submit' text='Submit' />
      </Form>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <Button
          variant='primary'
          text='Need Help?'
          type='button'
          action={handleModalOpen}
        />
      </div>
    </>
  );
}

export default Record;
