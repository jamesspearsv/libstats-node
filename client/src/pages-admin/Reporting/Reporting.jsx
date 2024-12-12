import ReportingParams from "./ReportingParams.jsx";
import { Navigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import ReportingDisplay from "./ReportingDisplay.jsx";

/**
 * Admin reporting page in admin app
 * @returns {JSX.Element}
 */

function Reporting() {
  const defaultParams = {
    startMonth: "",
    endMonth: "",
    category: "",
  };
  const { auth } = useOutletContext();
  const [params, setParams] = useState(defaultParams);

  function updateParams(param, value) {
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  function resetParams() {
    setParams(defaultParams);
  }

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
      <ReportingParams params={params} updateParams={updateParams} />
      <div style={{ display: "flex", gap: "1rem" }}>
        <p>startMonth: {params.startMonth}</p>
        <p>endMonth: {params.endMonth}</p>
        <p>category: {params.category}</p>
      </div>
      <ReportingDisplay params={params} />
    </div>
  );
}

export default Reporting;
