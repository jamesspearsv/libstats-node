import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Error from "./components/Error.jsx";

function App() {
  // Set api host based on env
  const apihost = import.meta.env.VITE_API_HOST || "http://localhost:3001";

  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log("api host:", apihost);

  // ** FETCH FORM OPTIONS ON MOUNT ** //
  useEffect(() => {
    try {
      (async () => {
        const url = `${apihost}/app/options`;

        const res = await fetch(url);
        const json = await res.json();

        // check that res is okay or throw error
        if (!res.ok) throw new Error(json.message);

        setOptions(json);
        setLoading(false);
      })();
    } catch (error) {
      console.error(error);
      setError(true);
    }

    return () => {
      setLoading(true);
      setError(false);
      setOptions({});
    };
  }, []);

  // Return early if there is an error
  if (error) return <Error status={"500"} />;

  return (
    <>
      <Nav
        navItems={[
          { label: "LibStats", route: "/" },
          { label: "Record", route: "/record" },
          { label: "Report", route: "/report" },
        ]}
      />
      <main>{!loading && <Outlet context={{ apihost, options }} />}</main>
      <footer>
        <Link to={"/admin"}>Admin Dashboard</Link>
      </footer>
    </>
  );
}

export default App;
