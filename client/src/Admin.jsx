import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Nav from "./components/Nav.jsx";
import Button from "./components/Button.jsx";

function Admin() {
  // set api host based on env
  const apihost = import.meta.env.VITE_API_HOST || "http://localhost:3001";
  // establish auth object state based on localstorage values
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("libstats_auth")) || null,
  );

  // store and update auth object in localstorage when auth state is changed
  useEffect(() => {
    auth
      ? localStorage.setItem("libstats_auth", JSON.stringify(auth))
      : localStorage.removeItem("libstats_auth");
  }, [auth]);

  // verify that token is still valid
  useEffect(() => {
    (async () => {
      if (!auth) return;

      try {
        const url = `${apihost}/auth/verify`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        // validate token
        const res = await fetch(url, options);
        const json = await res.json();

        // if token is invalid
        if (!res.ok) throw new Error(json.message);
      } catch (error) {
        setAuth(null);
        console.error(error);
      }
    })();
  }, []);

  function handleLogout() {
    toast.success("Logged out");
    // reset authorization state in Admin component
    setAuth(null);
  }

  return (
    <>
      <Nav
        navItems={[
          { label: "Back to App", route: "/" },
          { label: "Dashboard", route: "/admin" },
          { label: "Database", route: "/admin/database" },
        ]}
      />
      {auth && (
        <Button
          text={"Log out"}
          variant={"primary"}
          type={"button"}
          action={handleLogout}
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1000,
          }}
        />
      )}
      <main>
        <Outlet context={{ apihost, auth, setAuth }} />
      </main>
    </>
  );
}

export default Admin;
