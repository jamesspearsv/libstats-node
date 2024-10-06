import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import styles from './App.module.css';
import Nav from './components/Nav';

function App() {
  // Set api url based on env
  const [apiurl, setApiurl] = useState(
    import.meta.env.VITE_API_URL || 'http://localhost:3002'
  );

  console.log(import.meta.env);
  console.log(apiurl);

  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            backgroundColor: '#f5f4f4',
            fontFamily: 'Open Sans',
          },
          success: {
            iconTheme: {
              primary: '#185c36',
              secondary: 'white',
            },
          },
          error: {
            style: {
              iconTheme: {
                primary: '#dc3545',
                secondary: 'white',
              },
            },
          },
        }}
      />
      <Nav />
      <main className={styles.main}>
        <Outlet context={[apiurl, setApiurl]} />
      </main>
    </>
  );
}

export default App;
