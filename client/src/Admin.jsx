import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Nav from "./components/Nav.jsx";

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

  // Verify that token is still valid
  useEffect(() => {
    (async () => {
      if (!accessToken) return;

      const url = `${apihost}/auth/verify`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const res = await fetch(url, options);
      const json = await res.json();
      console.log(json);

      if (!res.ok) {
        setAccessToken(null);
        toast.error("Session expired");
      }
    })();
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
