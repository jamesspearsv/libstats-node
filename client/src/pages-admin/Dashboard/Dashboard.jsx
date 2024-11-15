import { Navigate, useOutletContext } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Button from "../../components/Button.jsx";
import toast from "react-hot-toast";
import { useState } from "react";

function Dashboard() {
  const { apihost, auth, setAuth } = useOutletContext();
  const [state, setState] = useState("state");

  function handleClick(e) {
    console.log(e.target.dataset.value);
    setState(e.target.dataset.value);
  }

  if (!auth) return <Navigate to={"/admin/login"} />;

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div className={styles.statsContainer}>
        <div className={styles.filters}>
          <h4>Filters</h4>
          <button
            className={state === "types" && styles.active}
            data-value={"types"}
            onClick={handleClick}
          >
            Types
          </button>
          <button
            className={state === "locations" && styles.active}
            data-value={"locations"}
            onClick={handleClick}
          >
            Locations
          </button>
          <button
            className={state === "formats" && styles.active}
            data-value={"formats"}
            onClick={handleClick}
          >
            Formats
          </button>
        </div>
        <div>Total count</div>
        <div>
          <div>Count grouped by {state}</div>
        </div>
        <div>
          <div>Pie Chart grouped by {state}</div>
        </div>
      </div>
      <div className={styles.table}>Table of all interactions</div>
    </>
  );
}

export default Dashboard;
