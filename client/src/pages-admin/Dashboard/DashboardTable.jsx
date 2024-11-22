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
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 25;

  // calculate number of pages
  useEffect(() => {
    try {
      //   do something
    } catch (error) {
      console.error(error);
      setError(true);
    }

    return () => {
      setLoading(true);
      setError(false);
      setTotalPages(0);
      setPage(0);
    };
  }, {});

  // fetch rows from database on page change
  useEffect(() => {
    (async () => {
      try {
        const url = `${apihost}/admin/interactions?page=${page}&limit=${limit}`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();

        if (res.status === 401) {
          return setAuth(null);
        } else if (!res.ok) {
          throw new Error(json.message);
        }

        setRows(json.rows);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        toast.error(error.message);
      }
    })();

    return () => {
      setLoading(true);
      setError(false);
      setRows([]);
    };
  }, [page]);

  if (error) {
    return (
      <div style={{ alignContent: "center", textAlign: "center" }}>
        <ErrorComponent status={500} />
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <CardWrapper style={{ width: "100%" }}>
        <h4 style={{ textAlign: "center" }}>All Interactions</h4>
        {loading ? (
          <div style={{ alignContent: "center", textAlign: "center" }}>
            <p>Loading...</p>
          </div>
        ) : (
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
        )}
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <button
            onClick={() => {
              setPage((page) => page - 1);
            }}
          >
            -
          </button>
          <div>{page + 1}</div>
          <button
            onClick={() => {
              setPage((page) => page + 1);
            }}
          >
            +
          </button>
        </div>
      </CardWrapper>
    </div>
  );
}

export default DashboardTable;
