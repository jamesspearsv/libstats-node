import { Navigate, useOutletContext } from "react-router-dom";
import Button from "../components/Button.jsx";
import toast from "react-hot-toast";

function Dashboard() {
  const { apihost, auth, setAuth } = useOutletContext();

  function handleLogout() {
    toast.success("Logged out");
    // reset authorization state in Admin component
    setAuth(null);
  }

  if (!auth) return <Navigate to={"/admin/login"} />;

  return (
    <>
      <h1>Dashboard</h1>
      <Button
        text={"Log out"}
        variant={"primary"}
        type={"button"}
        action={handleLogout}
      />
    </>
  );
}

export default Dashboard;
