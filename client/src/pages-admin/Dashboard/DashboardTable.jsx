import Table from "../../components/Table.jsx";
import Button from "../../components/Button.jsx";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CardWrapper from "../../components/CardWrapper.jsx";
import ErrorComponent from "../../components/ErrorComponent.jsx";
import { validateAdminResponse } from "../../lib/response.js";

function DashboardTable() {
  const { apihost, auth, setAuth } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 25;
  const pageButtonStyle = { borderRadius: "50rem", fontSize: ".875rem" };

  // calculate number of pages
  useEffect(() => {
    (async () => {
      try {
        const url = `${apihost}/admin/count/interactions`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();

        validateAdminResponse(res, json, setAuth);

        const total = Math.ceil(json.total_rows / limit);
        console.log(total);
        setTotalPages(total);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    })();

    return () => {
      setLoading(true);
      setError(false);
      setTotalPages(0);
      setPage(0);
    };
  }, []);

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

        validateAdminResponse(res, json, setAuth);

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

  function handlePageChange(event) {
    const action = event.target.dataset.id;

    if (action === "next") {
      //
      if (page + 1 === totalPages) return;
      setPage((page) => page + 1);
    } else if (action === "back") {
      //
      if (page === 0) return;
      setPage((page) => page - 1);
    } else return;
  }

  if (error) {
    return (
      <div style={{ alignContent: "center", textAlign: "center" }}>
        <ErrorComponent status={500} />
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <CardWrapper style={{ width: "100%", minHeight: "60dvh" }}>
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
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Button
            id={"back"}
            text={"Back"}
            type={"button"}
            variant={"primary"}
            style={pageButtonStyle}
            action={handlePageChange}
          />
          <div>
            {page + 1} of {totalPages} pages
          </div>
          <Button
            id={"next"}
            text={"Next"}
            type={"button"}
            variant={"primary"}
            style={pageButtonStyle}
            action={handlePageChange}
          />
        </div>
      </CardWrapper>
    </div>
  );
}

export default DashboardTable;
