import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav";
import Error from "./components/Error.jsx";

function App() {
  // Set api url based on env
  const [apihost] = useState(
    import.meta.env.VITE_API_HOST || "http://localhost:3001",
  );
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
        if (!res.ok) throw new Error(json.error);

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
  }, [apihost]);

  // Return early if there is an error
  if (error) return <Error status={"500"} />;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: "#f5f4f4",
            fontFamily: "Open Sans",
          },
          success: {
            iconTheme: {
              primary: "#185c36",
              secondary: "#ffffff",
            },
          },
          error: {
            style: {
              iconTheme: {
                primary: "#dc3545",
                secondary: "#ffffff",
              },
            },
          },
        }}
      />
      <Nav />
      <main className={styles.main}>
        {!loading && <Outlet context={{ apihost: apihost, options }} />}
      </main>
    </>
  );
}

export default App;
