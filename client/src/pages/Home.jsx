import Button from '../components/Button';
import Form from '../components/Form';
import toast from 'react-hot-toast';

function Home() {
  return (
    <>
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
        variant="danger"
        type="button"
      />
      <Button
        text="Primary Button"
        action={() => toast.success('Success')}
        variant="primary"
        type="button"
      />
      <br />
      <br />
      <Form title="Form Component" style={{ flexDirection: 'column' }}>
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
          variant="primary"
          type="submit"
        />
      </Form>
    </>
  );
}

export default Home;
