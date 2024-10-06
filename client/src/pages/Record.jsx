import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Form from '../components/Form';
import SelectInput from '../components/SelectInput';
import Modal from '../components/Modal';

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
    const url = `${apiurl}/options`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setFormOptions(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(true);
      });

    return () => {
      setLoading(true);
      setError(false);
    };
  }, [apiurl]);

  // HANDLE FORM SUBMISSION
  function handleFormSubmit(e) {
    e.preventDefault();
    // return if any form selects are invalid
    for (const value in formState) {
      if (!formState[value]) {
        toast.error('Please complete the form');
        return;
      }
    }

    // prepare for fetch call
    const url = apiurl + '/add';
    const options = {
      method: 'POST',
      body: JSON.stringify(formState),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // post data to api
    const currentToast = toast.loading('Adding interaction...');
    fetch(url, options).then((res) => {
      if (!res.ok) toast.error('Error', { id: currentToast });
      else toast.success('Success', { id: currentToast });
    });

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

  // Render component based on loading and error state
  if (loading) {
    return;
  } else if (error) {
    return (
      <>
        <h1>Error!</h1>
        <p>Something went wrong. Please try again later.</p>
      </>
    );
  } else {
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
        {/* <p>{formState.type ? formState.type : 'null'}</p>
        <p>{formState.location ? formState.location : 'null'}</p>
        <p>{formState.format ? formState.format : 'null'}</p> */}
      </>
    );
  }
}

export default Record;
