import Nav from "./components/Nav.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Admin() {
  // Set api host based on env
  const apihost = import.meta.env.VITE_API_HOST || "http://localhost:3001";
  const [accessToken, setAccessToken] = useState(true);

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
