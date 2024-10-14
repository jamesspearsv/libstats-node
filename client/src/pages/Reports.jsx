import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import Form from '../components/Form';
import SelectInput from '../components/SelectInput';
import Error from '../components/Error';
import DateInput from '../components/DateInput';
import Table from '../components/Table';
import CountReport from '../components/CountReport';

function Reports() {
  const defaultFormState = {
    start: '',
    end: '',
    location: '',
  };

  // eslint-disable-next-line no-unused-vars
  const [apiurl, setApiurl] = useOutletContext();
  const [formState, setFormState] = useState(defaultFormState);
  const [options, setOptions] = useState({});

  const [formLoading, setFormLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  // TODO -- add state for storing fetch results
  const [report, setReport] = useState({});

  // ** FETCH FORM OPTIONS ON COMPONENT MOUNT ** //
  useEffect(() => {
    async function fetchOptions() {
      const url = `${apiurl}/options`;
      try {
        const res = await fetch(url);
        const json = await res.json();

        // check that res is okay or throw error
        if (!res.ok) throw json.error;

        setOptions(json);
        setFormLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    fetchOptions();

    return () => {
      setFormLoading(true);
      setError(false);
    };
  }, [apiurl]);

  // ** FETCH DATA WHEN SELECTION FORM IS COMPLETE ** //
  useEffect(() => {
    for (const key in formState) {
      // return if form is incomplete
      if (!formState[key]) {
        setDataLoading(true);
        return;
      }
    }

    if (formState.end < formState.start) return;

    async function fetchInteractions() {
      try {
        const url = `${apiurl}/report?start=${formState.start}&end=${formState.end}&location=${formState.location}`;

        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok) throw json.error;

        // TODO -- parse and store data
        console.log(json);
        setReport(json);
        setDataLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }

    fetchInteractions();

    return () => {
      setDataLoading(true);
      setError(false);
    };
  }, [formState, apiurl]);

  // ** CHECK THAT START AND END DATE ARE VALID ** //
  useEffect(() => {
    toast.dismiss();
    if (formState.end != '' && formState.start != '') {
      if (formState.end < formState.start) {
        setDataLoading(true);
        toast.error('Start date cannot be after end date', {
          duration: Infinity,
          position: 'top-center',
        });
      } else {
        toast.dismiss();
      }
    }

    return () => toast.dismiss();
  }, [formState]);

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

  // early return if any errors
  if (error) return <Error />;

  return (
    <>
      {!formLoading && (
        <Form
          style={{
            gap: '0.5rem',
            width: 'fit-content',
            margin: 'auto',
            height: 'fit-content',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <DateInput
              label="Start"
              value={formState.start}
              handleChange={handleDateChange}
            />
            <DateInput
              label="End"
              value={formState.end}
              handleChange={handleDateChange}
            />
            <SelectInput
              label="Location"
              options={options.locations}
              handleChange={handleSelectChange}
              value={formState.location}
            />
          </div>
        </Form>
      )}
      {dataLoading ? (
        <p>Complete the form above</p>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              gap: '5rem',
              margin: 'auto',
              width: 'fit-content',
            }}
          >
            <CountReport title="Types" count={report.count_type} />
            <CountReport title="Formats" count={report.count_format} />
          </div>
          <Table rows={report.rows} />
        </>
      )}
    </>
  );
}

export default Reports;
