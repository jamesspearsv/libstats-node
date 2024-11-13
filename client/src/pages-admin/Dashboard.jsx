import { Navigate, useOutletContext } from "react-router-dom";
import Button from "../components/Button.jsx";
import toast from "react-hot-toast";

function Dashboard() {
  const { apihost, auth, setAuth } = useOutletContext();

  if (!auth) return <Navigate to={"/admin/login"} />;

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;
