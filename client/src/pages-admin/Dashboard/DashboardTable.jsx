import Table from "../../components/Table.jsx";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CardWrapper from "../../components/CardWrapper.jsx";
import ErrorComponent from "../../components/ErrorComponent.jsx";

// TODO: ADD PAGINATION TO TABLE
// const page = 0;
// const pageLen = 25;
// console.log("startingIndex: ", page * pageLen);
// console.log("endingIndex: ", page * pageLen + pageLen - 1);

function DashboardTable() {
  const { apihost, auth, setAuth } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const url = `${apihost}/admin/interactions`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();

        if (res.status === 401) {
          toast.error("Session expired");
          setAuth(null);
        } else if (!res.ok) {
          throw new Error(json.message);
        }

        console.log(json);
        setRows(json.rows);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log("ERROR");
        console.error(error);
        toast.error(error.message);
      }
    })();

    return () => {
      setLoading(true);
      setError(false);
      setRows([]);
    };
  }, []);

  if (error) {
    return (
      <div style={{ alignContent: "center", textAlign: "center" }}>
        <ErrorComponent status={500} />
      </div>
    );
  }

  if (loading)
    return (
      <div style={{ alignContent: "center", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div style={{ padding: "1rem" }}>
      <CardWrapper style={{ width: "100%" }}>
        <h4 style={{ textAlign: "center" }}>All Interactions</h4>
        <Table
          rows={rows}
          columns={[
            { key: "id", label: "ID" },
            { key: "type", label: "Type" },
            { key: "location", label: "Location" },
            { key: "format", label: "Format" },
            { key: "date", label: "Date" },
          ]}
          readonly={true}
        />
      </CardWrapper>
    </div>
  );
}

export default DashboardTable;
