import { Navigate, useOutletContext } from "react-router-dom";
import Button from "../components/Button.jsx";

function Dashboard() {
  const { apihost, accessToken, setAccessToken } = useOutletContext();

  function handleLogout() {
    setAccessToken(null);
  }

  if (!accessToken) return <Navigate to={"/admin/login"} />;

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
