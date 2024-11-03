import { Navigate, useOutletContext } from "react-router-dom";
import Form from "../components/Form.jsx";

function Login() {
  const { apihost, accessToken, setAccessToken } = useOutletContext();

  function handleLogin(e) {
    e.preventDefault();
    console.log(e.currentTarget);
  }

  if (accessToken) return <Navigate to={"/admin"} />;

  return (
    <>
      <Form title={"Login"} onSubmit={handleLogin}>
        <div>
          <label htmlFor="admin_password">Admin Password</label>
          <input name={"admin_password"} type={"password"} />
        </div>
        <input type={"submit"} />
      </Form>
    </>
  );
}

export default Login;
