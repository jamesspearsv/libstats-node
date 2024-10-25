import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import Nav from './components/Nav';

function App() {
  // Set api url based on env
  const [apiurl] = useState(
    import.meta.env.VITE_API_URL || 'http://localhost:3001'
  );
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  console.log('api url:', apiurl);

  // ** FETCH FORM OPTIONS ON MOUNT ** //
  useEffect(() => {
    async function fetchOptions() {
      const url = `${apiurl}/options`;

      const res = await fetch(url);
      const json = await res.json();

      // check that res is okay or throw error
      if (!res.ok) throw json.error;

      setOptions(json);
      setLoading(false);
    }
    fetchOptions();

    return () => {
      setLoading(true);
      setOptions({});
    };
  }, [apiurl]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: '#f5f4f4',
            fontFamily: 'Open Sans',
          },
          success: {
            iconTheme: {
              primary: '#185c36',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              iconTheme: {
                primary: '#dc3545',
                secondary: '#ffffff',
              },
            },
          },
        }}
      />
      <Nav />
      <main className={styles.main}>
        {!loading && <Outlet context={{ apiurl, options }} />}
      </main>
    </>
  );
}

export default App;
