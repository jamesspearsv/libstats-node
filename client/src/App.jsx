import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styles from './App.module.css';
import Nav from './components/Nav';

function App() {
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
        <Outlet />
      </main>
    </>
  );
}

export default App;
