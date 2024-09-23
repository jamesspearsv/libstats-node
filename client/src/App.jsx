import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import Button from './components/Button';
import Nav from './components/Nav';
import Form from './components/Form';

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
              primary: 'green',
              secondary: 'white',
            },
          },
        }}
      />
      <Nav />
      <main className={styles.main}>
        <Outlet />
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <p>This is normal body text.</p>
        <p className="body-small">This is small body text</p>
        <br />
        <br />
        <Button
          text="Danger Button"
          action={() => toast.error('Error')}
          style="danger"
          type="button"
        />
        <Button
          text="Primary Button"
          action={() => toast.success('Success')}
          style="primary"
          type="button"
        />
        <br />
        <br />
        <Form action="" method="GET" title="Form Component">
          <label htmlFor="input1">Input 1</label>
          <input type="text" name="input1" />
          <label htmlFor="input2">Input2</label>
          <input type="text" name="input2" />
          <Button
            text="Submit Form"
            action={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
            style="primary"
            type="submit"
          />
        </Form>
      </main>
    </>
  );
}

export default App;
