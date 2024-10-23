import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CardWrapper from '../components/CardWrapper';
import Button from '../components/Button';
import Error from '../components/Error';

import styles from './Home.module.css';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [apiurl, setApiurl] = useOutletContext();
  const [types, setTypes] = useState([]);
  const [data, setData] = useState({});
  const [effectTrigger, setEffectTrigger] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const url = `${apiurl}/dashboard`;
        const data = await fetch(url);

        if (!data.ok) throw 'data error';
        const json = await data.json();
        setData(json);

        console.log(json);

        const options = `${apiurl}/options`;
        const optionsData = await fetch(options);

        if (!optionsData.ok) throw 'option error';
        const optionsJson = await optionsData.json();
        setTypes(optionsJson.types);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    }

    fetchOptions();

    return () => {
      setError(false);
      setLoading(true);
    };
  }, [apiurl, effectTrigger]);

  function handleRefresh() {
    setLoading(true);
    setEffectTrigger((effectTrigger) => !effectTrigger);
    toast.loading('Refreshing', {
      duration: 1000,
    });
  }

  if (error) return <Error />;

  return (
    <>
      <h1 className={styles.heading}>LibStats</h1>
      <hr className={styles.divider} />
      <div className={styles.container}>
        <div className={styles.quickstartContainer}>
          <div className={styles.quickstart}>
            <h2>Quickstart</h2>
            <p style={{ lineHeight: '1.5' }}>
              LibStats is a simple app that allows you to record, and build
              reports about reference interactions that are completed in the
              library. Click record in the menu to get started. If you have any
              questions speak to your supervisor.
            </p>
          </div>
          <CardWrapper>
            <div className={styles.monthly}>
              <div className={styles.monthly_label}>
                Interactions This Month
              </div>
              <div style={{ minHeight: '25px' }}>
                <div>{loading ? '0' : data.count_month}</div>
              </div>
              <Button
                text="Refresh"
                type="button"
                variant="primary"
                action={handleRefresh}
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              />
            </div>
          </CardWrapper>
        </div>
        <div className={styles.types}>
          {types.map((type) => (
            <CardWrapper
              key={type.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{type.value}</div>
              <hr />
              <div>{type.desc}</div>
            </CardWrapper>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
