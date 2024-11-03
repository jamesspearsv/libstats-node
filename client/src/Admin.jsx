import Nav from "./components/Nav.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function Admin() {
  // Set api host based on env
  const apihost = import.meta.env.VITE_API_HOST || "http://localhost:3001";
  // Establish accessToken state
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("auth") || null,
  );

  // store access token in local storage to persist authorization between component mounts
  useEffect(() => {
    accessToken
      ? localStorage.setItem("auth", accessToken)
      : localStorage.removeItem("auth");
  }, [accessToken]);

  // TODO : Verify token expiration
  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <>
      <Nav navItems={[{ label: "Back to App", route: "/" }]} />
      <main>
        <Outlet context={{ apihost, accessToken, setAccessToken }} />
      </main>
    </>
  );
}

export default Admin;
