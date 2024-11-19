import { Navigate, useOutletContext } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Button from "../../components/Button.jsx";
import toast from "react-hot-toast";
import { useState } from "react";
import DashboardStats from "./DashboardStats.jsx";
import DashboardTable from "./DashboardTable.jsx";

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
      <DashboardStats />
      <DashboardTable />
    </>
  );
}

export default Dashboard;
