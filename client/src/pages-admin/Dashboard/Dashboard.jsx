import { Navigate, useOutletContext } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Button from "../../components/Button.jsx";
import toast from "react-hot-toast";
import { useState } from "react";
import DashboardStats from "./DashboardStats.jsx";
import DashboardTable from "./DashboardTable.jsx";

function Dashboard() {
  const { auth } = useOutletContext();

  if (!auth) return <Navigate to={"/admin/login"} />;

  return (
    <div>
      <DashboardStats />
      <DashboardTable />
    </div>
  );
}

export default Dashboard;
