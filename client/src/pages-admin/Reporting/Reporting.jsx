import ReportingParams from "./ReportingParams.jsx";
import { Navigate, useOutletContext } from "react-router-dom";

function Reporting() {
  const { auth } = useOutletContext();

  if (!auth) return <Navigate to={"/admin/login"} />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <ReportingParams />
    </div>
  );
}

export default Reporting;
