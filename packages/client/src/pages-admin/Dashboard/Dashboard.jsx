import { Navigate, useOutletContext } from "react-router-dom";
import DashboardStats from "./DashboardStats.jsx";
import DashboardTable from "./DashboardTable.jsx";

/**
 * Dashboard page in admin app
 * @returns {JSX.Element}
 */

function Dashboard() {
  const { auth } = useOutletContext();

  if (!auth) return <Navigate to={"/admin/login"} />;

  return (
    <div style={{ margin: "0 2.5rem" }}>
      <DashboardStats />
      <DashboardTable />
    </div>
  );
}

export default Dashboard;
