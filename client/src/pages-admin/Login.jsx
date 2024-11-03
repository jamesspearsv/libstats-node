import { Navigate, useOutletContext } from "react-router-dom";
import Form from "../components/Form.jsx";
import { useState } from "react";
import Button from "../components/Button.jsx";
import { toast } from "react-hot-toast";

function Login() {
  const { apihost, accessToken, setAccessToken } = useOutletContext();
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const password = e.target.elements.password.value;

    (async () => {
      try {
        // fetch request params
        const url = `${apihost}/auth/token`;
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: password,
          }),
        };

        const res = await fetch(url, options);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message);
        console.log(json);
        setAccessToken(json.token);
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    })();
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if (accessToken) return <Navigate to={"/admin"} />;

  return (
    <>
      <Form onSubmit={handleLogin} style={{ margin: "auto", width: "250px" }}>
        <div>
          <label htmlFor="password" style={{ textAlign: "center" }}>
            Admin Password
          </label>
          <input
            name={"password"}
            type={"password"}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Button
          text={"Login"}
          onClick={handleLogin}
          type={"submit"}
          variant={"primary"}
        />
      </Form>
    </>
  );
}

export default Login;
