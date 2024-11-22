import { Navigate, useOutletContext } from "react-router-dom";
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
