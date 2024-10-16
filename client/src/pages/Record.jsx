import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

// ** COMPONENT IMPORTS ** //
import Button from '../components/Button';
import Form from '../components/Form';
import SelectInput from '../components/SelectInput';
import Modal from '../components/Modal';
import Error from '../components/Error';
import CardWrapper from '../components/CardWrapper';

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

  // ** FETCH FORM OPTIONS ON MOUNT ** //
  useEffect(() => {
    async function fetchOptions() {
      const url = `${apiurl}/options`;
      try {
        const res = await fetch(url);
        const json = await res.json();

        // check that res is okay or throw error
        if (!res.ok) throw json.error;

        setFormOptions(json);
        console.log(json);
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

  // ** HANDLE FORM SUBMISSION ** //
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

        toast.success('Success!', { id: currentToast });
      } catch (error) {
        console.error(error);
        toast.error(error, { id: currentToast });
      }
    }
    postInteraction();

    setFormState(defaultFormState);
  }

  // ** HANDLE SELECT INPUT CHANGE ** //
  function handleSelectChange(e) {
    const id = e.currentTarget.id;
    const updatedState = { ...formState };
    updatedState[id] = e.currentTarget.value;
    setFormState(updatedState);
  }

  // ** OPEN MODAL ** //
  function handleModalOpen() {
    setIsOpen(true);
  }

  // // Render component based on loading and error state
  if (error) return <Error />;
  if (loading) return;

  return (
    <>
      <Form
        onSubmit={handleFormSubmit}
        title={'Add New Interaction'}
        style={{ margin: 'auto ', width: 'max(20%, 350px)' }}
      >
        <SelectInput
          label="Type"
          options={formOptions.types}
          handleChange={handleSelectChange}
          value={formState.type}
        />
        <SelectInput
          label="Location"
          options={formOptions.locations}
          handleChange={handleSelectChange}
          value={formState.location}
        />
        <SelectInput
          label="Format"
          options={formOptions.formats}
          handleChange={handleSelectChange}
          value={formState.format}
        />
        <Button variant="primary" type="submit" text="Submit" />
      </Form>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <Button
          variant="primary"
          text="Need Help?"
          type="button"
          action={handleModalOpen}
        />
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h3>Interaction Type Definitions</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'start',
          }}
        >
          {formOptions.types.map((type) => (
            <CardWrapper
              key={type.id}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{type.value}</div>
              <hr />
              <p>{type.desc}</p>
            </CardWrapper>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default Record;
