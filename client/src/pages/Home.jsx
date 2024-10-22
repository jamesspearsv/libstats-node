import { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import CardWrapper from '../components/CardWrapper';
import Button from '../components/Button';
import { toast } from 'react-hot-toast';

import styles from './Home.module.css';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [apiurl, setApiurl] = useOutletContext();
  const [types, setTypes] = useState([]);
  const [data, setData] = useState({});
  const [effectTrigger, setEffectTrigger] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      const url = `${apiurl}/dashboard`;

      const data = await fetch(url);
      const json = await data.json();
      setData(json);

      console.log(json);

      const options = `${apiurl}/options`;
      const optionsData = await fetch(options);
      const optionsJson = await optionsData.json();
      setTypes(optionsJson.types);

      console.log(optionsJson.types);

      setLoading(false);
    }

    fetchOptions();
  }, [apiurl, effectTrigger]);

  function handleRefresh() {
    setLoading(true);
    setEffectTrigger((effectTrigger) => !effectTrigger);
    toast.loading('Refreshing', {
      duration: 1000,
    });
  }

  return (
    <>
      <h1 className={styles.heading}>LibStats</h1>
      <hr className={styles.divider} />
      <div className={styles.container}>
        <div className={styles.quickstart}>
          <p>
            LibStats is a simple app that allows you to record, and build
            reports reference interactions that are completed in the library.
            Click <Link to={'/record'}>Record</Link> in the menu to get started.
          </p>
        </div>
        <CardWrapper>
          <div className={styles.monthly}>
            <div className={styles.monthly_label}>Interactions This Month</div>
            <div style={{ minHeight: '25px' }}>
              <div>{data.count_month}</div>
            </div>
            <Button
              text="Refresh"
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
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>{type.value}</div>
            <hr />
            <div>{type.desc}</div>
          </CardWrapper>
        ))}
      </div>
    </>
  );
}

export default Home;
