import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CardWrapper from '../components/CardWrapper';
import Button from '../components/Button';
import SlotCounter from 'react-slot-counter';

import styles from './Home.module.css';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [apiurl, setApiurl] = useOutletContext();
  const [data, setData] = useState({});
  const [effectTrigger, setEffectTrigger] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      const url = `${apiurl}/dashboard`;

      const data = await fetch(url);
      const json = await data.json();

      console.log(json);

      setData(json);
      setLoading(false);
    }

    fetchOptions();
  }, [apiurl, effectTrigger]);

  function handleRefresh() {
    setLoading(true);
    setEffectTrigger((effectTrigger) => !effectTrigger);
  }

  return (
    <>
      <h1 className={styles.heading}>LibStats</h1>
      <hr />
      <CardWrapper>
        <div className={styles.monthly}>
          <div className={styles.monthly_label}>Interactions This Month</div>
          <div style={{ minHeight: '25px' }}>
            {!loading && (
              <SlotCounter
                startValue={'0'}
                value={data.count_month}
                useMonospaceWidth
              />
            )}
          </div>
          <Button
            text="Refresh"
            variant="primary"
            action={handleRefresh}
            style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
          />
        </div>
      </CardWrapper>
    </>
  );
}

export default Home;
